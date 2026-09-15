// Google Tag Manager — single source of truth for the container ID and the
// install snippet.
//
// The snippet has to be injected through HeadConfig.other, not HeadConfig.tags:
// renderTag() in @yext/pages emits `<script attrs></script>` with an empty body
// for every script tag, so an inline script cannot be expressed as a Tag. See
// node_modules/@yext/pages/dist/common/src/template/head.js.
//
// `other` is rendered last in the head (title → charset → viewport → tags →
// other), which is a fixed order in the package. GTM therefore lands just
// before </head> rather than first as Google's instructions ask — still well
// before <body> executes, so the container fires normally.

export const GTM_ID = "GTM-5BZ86CG";

export const GTM_HEAD_SNIPPET = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`;
