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
  hasScrollToTop?: boolean;
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

const scrollToTopScript = `
  (function() {
    if (typeof window === 'undefined') return;

    function initScrollToTop() {
      var btn = document.querySelector('[data-sinc-scroll-to-top]');
      if (!btn) return;

      var threshold = 300;
      var handleScroll = function() {
        var scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > threshold) {
          btn.setAttribute('data-visible', 'true');
        } else {
          btn.setAttribute('data-visible', 'false');
        }
      };

      btn.addEventListener('click', function() {
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initScrollToTop);
    } else {
      initScrollToTop();
    }
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
    hasScrollToTop = true,
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

      if (hasScrollToTop) {
        tags.push(
          {
            injectTo: 'body',
            tag: 'button',
            attrs: {
              type: 'button',
              class:
                'sinc-button solid primary md iconOnly pill sinc-scroll-to-top-btn',
              'data-sinc-scroll-to-top': 'true',
              'aria-label': 'Voltar ao topo da página',
              style:
                'position: fixed; bottom: 2.4rem; right: 2.4rem; z-index: 200; opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s;',
            },
            children: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
          },
          {
            injectTo: 'body',
            tag: 'script',
            children: scrollToTopScript,
          },
        );
      }

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
