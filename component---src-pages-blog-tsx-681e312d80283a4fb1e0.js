(window.webpackJsonp=window.webpackJsonp||[]).push([[8,11],{217:function(e,t,a){"use strict";a.r(t),a.d(t,"indexKeywords",(function(){return s})),a.d(t,"query",(function(){return u}));var r=a(0),n=a.n(r),l=a(215),o=a(214),s=["gorka","hernandez","estomba","web","developer","consultant","portfolio","blog","contact","react","angular","guides","guide","tutorial","help","beginners","intermediate","advanced","tutorials"];t.default=function(e){e.data;return n.a.createElement(l.a,null,n.a.createElement(o.a,{title:"Home",keywords:s}),n.a.createElement("div",null,"Homepage"))};var u="3934607166"},225:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return c}));var r=a(0),n=a.n(r),l=a(215),o=a(214),s=a(217),u=a(230);t.default=function(e){var t=e.data;return n.a.createElement(l.a,null,n.a.createElement(o.a,{title:"Home",keywords:s.indexKeywords}),n.a.createElement("div",{style:{maxWidth:1260,padding:"0px 1rem 1rem"}},n.a.createElement(u.a,{posts:t.allMarkdownRemark.edges})))};var c="3934607166"},230:function(e,t,a){"use strict";var r=a(0),n=a.n(r),l=a(11),o=a(216),s=a.n(o),u=function(e){var t=e.posts;return n.a.createElement(n.a.Fragment,null,n.a.createElement("h4",null,t.length," posts"),t.map((function(e){var t=e.node;return n.a.createElement("div",{className:s.a.postWrapper,key:t.id},n.a.createElement(l.a,{className:s.a.headerLink,to:t.fields.slug},n.a.createElement("h3",null,t.frontmatter.title," "," ")),n.a.createElement("p",{className:s.a.postDate},t.frontmatter.date.toUpperCase(),n.a.createElement("span",{className:"separator-square"}),n.a.createElement("span",{className:s.a.postAuthor},t.frontmatter&&t.frontmatter.author?t.frontmatter.author.toUpperCase():null)),n.a.createElement("p",null,t.excerpt,n.a.createElement("br",null),n.a.createElement(l.a,{className:"read-more-link",to:t.fields.slug},"READ MORE")))})))};u.defaultProps={posts:[]},t.a=u}}]);
//# sourceMappingURL=component---src-pages-blog-tsx-681e312d80283a4fb1e0.js.map