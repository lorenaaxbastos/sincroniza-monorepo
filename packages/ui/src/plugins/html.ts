import type { HtmlTagDescriptor, Plugin } from 'vite';

export interface SincronizaHtmlOptions {
  title?: string;
  description?: string;
  favicon?: string;
  ogImage?: string;
  canonicalUrl?: string;
  lang?: string;
  theme?: 'light' | 'dark' | 'system';
  googleAnalyticsId?: string;
  handTalkToken?: string;
}

const themeScript = (theme: string): string => `
  (function() {
    var defaultTheme = ${JSON.stringify(theme)};
    var getThemePreference = function() {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
      }
      if (defaultTheme === 'light' || defaultTheme === 'dark') {
        return defaultTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    var activeTheme = getThemePreference();
    document.documentElement.setAttribute('data-theme', activeTheme);
  })();
`;

const globalListenersScript = `
  (function() {
    if (typeof window === 'undefined') return;

    function closeOpenElements() {
      var openElements = document.querySelectorAll('[data-state="open"]');
      openElements.forEach(function(el) {
        el.setAttribute('data-state', 'closed');
      });
    }

    function toggleTheme() {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
      return next;
    }

    document.addEventListener('click', function(event) {
      var target = event.target;
      if (target && target.matches && target.matches('[data-global-overlay]')) {
        closeOpenElements();
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeOpenElements();
      }
    });

    document.addEventListener('click', function(event) {
      var target = event.target;
      var themeBtn = target && target.closest ? target.closest('[data-theme-toggle]') : null;

      if (themeBtn) {
        var newTheme = toggleTheme();
        var isDark = newTheme === 'dark';
        themeBtn.setAttribute('aria-pressed', String(isDark));
        themeBtn.setAttribute('data-active', String(isDark));
      }
    });
  })();
`;

export function sincronizaHtmlPlugin(
  options: SincronizaHtmlOptions = {},
): Plugin {
  const {
    title = 'Sincroniza',
    description = '',
    favicon = '/favicon.svg',
    ogImage = '/og-default.jpg',
    canonicalUrl,
    lang = 'pt-BR',
    theme = 'light',
    googleAnalyticsId,
    handTalkToken,
  } = options;

  return {
    name: 'vite-plugin-sincroniza-html',
    transformIndexHtml(html: string) {
      const tags: HtmlTagDescriptor[] = [];

      tags.push({
        injectTo: 'head-prepend',
        tag: 'html',
        attrs: { lang },
      });

      tags.push({
        injectTo: 'head',
        tag: 'title',
        children: title,
      });

      tags.push({
        injectTo: 'head',
        tag: 'meta',
        attrs: { name: 'description', content: description },
      });

      tags.push({
        injectTo: 'head',
        tag: 'link',
        attrs: { rel: 'icon', type: 'image/svg+xml', href: favicon },
      });

      if (canonicalUrl) {
        tags.push({
          injectTo: 'head',
          tag: 'link',
          attrs: { rel: 'canonical', href: canonicalUrl },
        });
      }

      tags.push(
        {
          injectTo: 'head',
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          injectTo: 'head',
          tag: 'meta',
          attrs: { property: 'og:title', content: title },
        },
        {
          injectTo: 'head',
          tag: 'meta',
          attrs: { property: 'og:description', content: description },
        },
        {
          injectTo: 'head',
          tag: 'meta',
          attrs: { property: 'og:image', content: ogImage },
        },
      );

      if (canonicalUrl) {
        tags.push({
          injectTo: 'head',
          tag: 'meta',
          attrs: { property: 'og:url', content: canonicalUrl },
        });
      }

      tags.push({
        injectTo: 'head',
        tag: 'script',
        children: themeScript(theme),
      });

      if (googleAnalyticsId) {
        tags.push(
          {
            injectTo: 'head',
            tag: 'script',
            attrs: {
              async: true,
              src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
            },
          },
          {
            injectTo: 'head',
            tag: 'script',
            children: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `,
          },
        );
      }

      tags.push({
        injectTo: 'body-prepend',
        tag: 'a',
        attrs: {
          href: '#main-content',
          class: 'sinc-main-content-link sinc-sr-only --focusable',
        },
        children: 'Pular para o conteúdo principal',
      });

      tags.push({
        injectTo: 'body',
        tag: 'div',
        attrs: {
          class: 'sinc-global-overlay',
          'data-global-overlay': 'true',
          'aria-hidden': 'true',
        },
      });

      tags.push({
        injectTo: 'body',
        tag: 'script',
        children: globalListenersScript,
      });

      if (handTalkToken) {
        tags.push(
          {
            injectTo: 'body',
            tag: 'script',
            attrs: {
              src: 'https://plugin.handtalk.me/web/latest/handtalk.min.js',
            },
          },
          {
            injectTo: 'body',
            tag: 'script',
            children: `
              var ht = new HT({
                token: ${JSON.stringify(handTalkToken)},
                avatar: "MAYA",
                pageSpeech: true
              });
            `,
          },
        );
      }

      return {
        html,
        tags,
      };
    },
  };
}
