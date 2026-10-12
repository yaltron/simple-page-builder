globalThis.__nitro_main__ = import.meta.url;
import "./_libs/unenv.mjs";

import { H as HookableCore } from "./_libs/hookable.mjs";
import { d as defineLazyEventHandler, H as HTTPError, a as H3Core } from "./_libs/h3.mjs";
import { b as FastResponse } from "./_libs/srvx.mjs";


import "./_libs/rou3.mjs";





function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const assets = {
  "/apple-icon.png": {
    "type": "image/png",
    "etag": '"a42-o953JxvIavDjStfvW8JRF7vWLk4"',
    "mtime": "2026-08-04T05:56:40.288Z",
    "size": 2626,
    "path": "../public/apple-icon.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"34bf-WOmtZ4EkOVwjl8KRmC95nndzJvY"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 13503,
    "path": "../public/favicon.ico"
  },
  "/icon-dark-32x32.png": {
    "type": "image/png",
    "etag": '"249-Eje7mf5IYnUOzvWahZHzVZgkxwI"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 585,
    "path": "../public/icon-dark-32x32.png"
  },
  "/icon-light-32x32.png": {
    "type": "image/png",
    "etag": '"236-1LCyzDLVe8SSrsZvG9eS1rhTvHw"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 566,
    "path": "../public/icon-light-32x32.png"
  },
  "/icon.svg": {
    "type": "image/svg+xml",
    "etag": '"518-9M+7JU4r6V/KOpL+LPj+dv/tp9E"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 1304,
    "path": "../public/icon.svg"
  },
  "/llms.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"432-G3bvY6p+UPxJl4FxtpSlNblqRlw"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 1074,
    "path": "../public/llms.txt"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": '"de60-i9zlT/RrmhF8iRO1Xs0qUQ9c0aY"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 56928,
    "path": "../public/logo.png"
  },
  "/og-image.jpg": {
    "type": "image/jpeg",
    "etag": '"2448-2CEohfVgYV4lFGiefCCj9ZWBmmg"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 9288,
    "path": "../public/og-image.jpg"
  },
  "/placeholder-logo.png": {
    "type": "image/png",
    "etag": '"238-pS23KseK6wWmMHqaT+IrH57MhUI"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 568,
    "path": "../public/placeholder-logo.png"
  },
  "/placeholder-logo.svg": {
    "type": "image/svg+xml",
    "etag": '"c88-Vv8IA2xgjEZAiN2dErxBClzvxAM"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 3208,
    "path": "../public/placeholder-logo.svg"
  },
  "/placeholder-user.jpg": {
    "type": "image/jpeg",
    "etag": '"663-C3c0t/BkPcGmoKQMFVHBP6o+6fQ"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 1635,
    "path": "../public/placeholder-user.jpg"
  },
  "/placeholder.jpg": {
    "type": "image/jpeg",
    "etag": '"428-IKS5JfbV4RoTBDDc/wuWqgR2Qhw"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 1064,
    "path": "../public/placeholder.jpg"
  },
  "/placeholder.svg": {
    "type": "image/svg+xml",
    "etag": '"cb5-3cfZ/x0uNhX4kurZGAkOBE4K/G0"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 3253,
    "path": "../public/placeholder.svg"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"6b-iS/LJ+ILKMozI8/FBKs5bRTHtgw"',
    "mtime": "2026-08-04T05:56:40.296Z",
    "size": 107,
    "path": "../public/robots.txt"
  },
  "/shubhashree-01.png": {
    "type": "image/png",
    "etag": '"1a770-q2W+DqM9lcFBI6nI4byEth3XVMc"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 108400,
    "path": "../public/shubhashree-01.png"
  },
  "/shubhashree-logo.png": {
    "type": "image/png",
    "etag": '"de60-i9zlT/RrmhF8iRO1Xs0qUQ9c0aY"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 56928,
    "path": "../public/shubhashree-logo.png"
  },
  "/sitemap.xml": {
    "type": "application/xml",
    "etag": '"132b-w44qo+jm4jD3PNzYEVavWWIRNM0"',
    "mtime": "2026-08-04T05:56:40.293Z",
    "size": 4907,
    "path": "../public/sitemap.xml"
  },
  "/assets/about-Bm4Q27tY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27fa-uW04qVnaMULcmpH/wq0EYwvelt8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 10234,
    "path": "../public/assets/about-Bm4Q27tY.js"
  },
  "/assets/admin.about.cta-banner-0UDEHMWU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"332-EetVzFw77/MYRSECkyVPfuPWYZ0"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 818,
    "path": "../public/assets/admin.about.cta-banner-0UDEHMWU.js"
  },
  "/assets/admin.about.mission-vision-JNfgdEjX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"33e-IKfiCveOkSeeGejlrM9idKWbM3s"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 830,
    "path": "../public/assets/admin.about.mission-vision-JNfgdEjX.js"
  },
  "/assets/admin.about.our-story-BiRZ0Mxb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"330-ANVooOGUidpPLfQiNrO8oA09CEc"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 816,
    "path": "../public/assets/admin.about.our-story-BiRZ0Mxb.js"
  },
  "/assets/admin.about.values-COsK9fmv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"332-awkG0XvjYh9OF0lG4/mEKXS972k"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 818,
    "path": "../public/assets/admin.about.values-COsK9fmv.js"
  },
  "/assets/admin.appointments.index-DPViaGgq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"34f2-l2X0xCc1joD3DJoG5iLx+8C0xh8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 13554,
    "path": "../public/assets/admin.appointments.index-DPViaGgq.js"
  },
  "/assets/admin.blog._id-wEgb_XTP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3590-Yu0Yk1ZbjR+1cKEgYG1tc1ipI+8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 13712,
    "path": "../public/assets/admin.blog._id-wEgb_XTP.js"
  },
  "/assets/admin.about.why-choose-us-DadqKxxk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"338-05lTJPUDZ4OzkyNlbIZ7AOXgW9o"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 824,
    "path": "../public/assets/admin.about.why-choose-us-DadqKxxk.js"
  },
  "/assets/admin.career.applications-Bjs5XK16.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"334-EvqW2LogQ3vjh2NDOmUSXN5bb1E"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 820,
    "path": "../public/assets/admin.career.applications-Bjs5XK16.js"
  },
  "/assets/admin.career.listings-DL0pr0QU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"334-+6/OM9NuoVQV7pvVcQaBaVdCAUk"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 820,
    "path": "../public/assets/admin.career.listings-DL0pr0QU.js"
  },
  "/assets/admin.blog.index-CvkKdj7b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1069-6ITC+NvNXEFVdCML+fftfGWjE1w"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 4201,
    "path": "../public/assets/admin.blog.index-CvkKdj7b.js"
  },
  "/assets/admin.faqs.index-CC1Ss87J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"20d3-+ibXlWqGs0qDvPgDoKnqPNQi6k4"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 8403,
    "path": "../public/assets/admin.faqs.index-CC1Ss87J.js"
  },
  "/assets/admin.gallery.index-CN4X4s74.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aae-Lbemq0ll2JGpsI/N8q6h8MLzZZg"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 6830,
    "path": "../public/assets/admin.gallery.index-CN4X4s74.js"
  },
  "/assets/admin.gallery.virtual-tour-CfM4tjrD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"330-E72x5mgBbmZ/YyAYfcZU4anr3gY"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 816,
    "path": "../public/assets/admin.gallery.virtual-tour-CfM4tjrD.js"
  },
  "/assets/admin.gallery.podcasts-DvA3qlNd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1684-/ZjFYXTVeef6H5g5WAOXNWalrQA"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 5764,
    "path": "../public/assets/admin.gallery.podcasts-DvA3qlNd.js"
  },
  "/assets/admin.homepage.cta-banner-v5-089if.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"332-KSeW9uEmMfuXld/xLxTQTkQDlS8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 818,
    "path": "../public/assets/admin.homepage.cta-banner-v5-089if.js"
  },
  "/assets/admin.homepage.doctors-heading-DqJKjXWu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"33c-0nSB38SaDW+/UUEbCaE1Q3rynkg"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 828,
    "path": "../public/assets/admin.homepage.doctors-heading-DqJKjXWu.js"
  },
  "/assets/admin.homepage.hero-DbXAJWjn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32e-yTcu6jWZg5w939MT7tpzz+f1e5A"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 814,
    "path": "../public/assets/admin.homepage.hero-DbXAJWjn.js"
  },
  "/assets/admin.homepage.how-it-works-DuTDuUdk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"336-ubIyJbMJ+1EVyQwCeMDEO/rLCfQ"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 822,
    "path": "../public/assets/admin.homepage.how-it-works-DuTDuUdk.js"
  },
  "/assets/admin.homepage.services-Di6QDXqc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"336-POkWg/UaAnFUTfvLZ7Cps5epIl0"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 822,
    "path": "../public/assets/admin.homepage.services-Di6QDXqc.js"
  },
  "/assets/admin.homepage.when-to-visit-uvom1WC3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"338-SCtYQDYXI1UJEjdrVazpor1jpHs"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 824,
    "path": "../public/assets/admin.homepage.when-to-visit-uvom1WC3.js"
  },
  "/assets/admin.homepage.who-we-are-DAuABsbE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32d-fmI5yfYZSaSe+xTT3G3rAshwelo"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 813,
    "path": "../public/assets/admin.homepage.who-we-are-DAuABsbE.js"
  },
  "/assets/admin.homepage.why-choose-us-Dv-lTfrA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b6a-rl0Wen9zUFJzs8+SjYGEJxXog34"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 7018,
    "path": "../public/assets/admin.homepage.why-choose-us-Dv-lTfrA.js"
  },
  "/assets/admin.login-COSlWjyn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1bcd-C94EMIIuEdE3x7aau+RDbhXbe9s"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 7117,
    "path": "../public/assets/admin.login-COSlWjyn.js"
  },
  "/assets/admin.index-NdboepNm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166c-MO2+Y9z+hhq5g25mDiVp9d+j7Mw"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 5740,
    "path": "../public/assets/admin.index-NdboepNm.js"
  },
  "/assets/admin.popup-banners-CFaoeaos.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"235d-tLKpfeBK5c3Dopc6NS9gmWNKods"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 9053,
    "path": "../public/assets/admin.popup-banners-CFaoeaos.js"
  },
  "/assets/admin.services.index-aMjR5FHG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2376-NruuqUi3NALD3jRYFweSdqxzvHE"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 9078,
    "path": "../public/assets/admin.services.index-aMjR5FHG.js"
  },
  "/assets/admin.team-DfPfv7Wn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17e9-4x3+GNSg1qUCWDnXJ4nxgxAh2DY"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 6121,
    "path": "../public/assets/admin.team-DfPfv7Wn.js"
  },
  "/assets/admin.testimonials.index-DBtDet6T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c04-7oiKg10CfZxJMLsBGlm5AA7xz2c"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 7172,
    "path": "../public/assets/admin.testimonials.index-DBtDet6T.js"
  },
  "/assets/arrow-left-D73igX0i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-RieEyJATzGCpCa+NTula9w49J1I"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 166,
    "path": "../public/assets/arrow-left-D73igX0i.js"
  },
  "/assets/arrow-right-BFlg1EAF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-WoLeTkLNDGMHEEbO1pCtIVKChg8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 166,
    "path": "../public/assets/arrow-right-BFlg1EAF.js"
  },
  "/assets/arrow-up-BxrygTtf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"118-cNawtZ99ssoyhA3Tgp/iMSlH2Fw"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 280,
    "path": "../public/assets/arrow-up-BxrygTtf.js"
  },
  "/assets/blog._slug-Bt89Hf7h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-KJwN2g0yU2TdQjjh/zSqc206NpU"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 329,
    "path": "../public/assets/blog._slug-Bt89Hf7h.js"
  },
  "/assets/blog._slug-Cdfk77gC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11d7-vsdwJYZIiEfx6y6b8iFKg6M6vl8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 4567,
    "path": "../public/assets/blog._slug-Cdfk77gC.js"
  },
  "/assets/blog._slug-DRGshrlG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c-Fppazn6siTHnAtYIDp9/AJOtbDA"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 572,
    "path": "../public/assets/blog._slug-DRGshrlG.js"
  },
  "/assets/blog.index-BQ8z4Ab8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"168c-hScFz9qS7SY2GxHG2X8rex9GNJs"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 5772,
    "path": "../public/assets/blog.index-BQ8z4Ab8.js"
  },
  "/assets/briefcase-B2p1TQPJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"dd-ULK/xiXCZTuAmGDTS92hQMEnGRw"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 221,
    "path": "../public/assets/briefcase-B2p1TQPJ.js"
  },
  "/assets/calendar-range-DqX-luOY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"35e-DCFgGTAFUAukY377TlqD8XrP7cQ"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 862,
    "path": "../public/assets/calendar-range-DqX-luOY.js"
  },
  "/assets/careers-CbMyHuyz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2261-AKpEh2gVZ0TlARbxdxvVmSNIDqA"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 8801,
    "path": "../public/assets/careers-CbMyHuyz.js"
  },
  "/assets/chevron-left-D-Z9EiTs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-7Mgkz7XkhWEkd+tXNIqkmqi9RDA"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 131,
    "path": "../public/assets/chevron-left-D-Z9EiTs.js"
  },
  "/assets/chevron-right-cZt7zZGI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-yytQ8A9DR0BGqhn1gKFGERATM/M"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 131,
    "path": "../public/assets/chevron-right-cZt7zZGI.js"
  },
  "/assets/circle-check-i4ih-00m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3-e3HbNHl1IHXKvotX2TpRuEGPKaE"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 179,
    "path": "../public/assets/circle-check-i4ih-00m.js"
  },
  "/assets/circle-x-Bos0aeZn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d0-LkT42hWHl/UpXHrRdymT1CE5wdk"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 208,
    "path": "../public/assets/circle-x-Bos0aeZn.js"
  },
  "/assets/cms-editors-EDKfxuJ4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17bfe-yc3kLpto/7TjgrnF5nhCitZ7JlU"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 97278,
    "path": "../public/assets/cms-editors-EDKfxuJ4.js"
  },
  "/assets/color-picker-hfOygvKX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"390-6TdevdxJ+MBuiv2YziZIFFBIs/I"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 912,
    "path": "../public/assets/color-picker-hfOygvKX.js"
  },
  "/assets/contact-DfmO7KCz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1764-R6l5g8GI2/TRNNPzGkGuwjIwg30"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 5988,
    "path": "../public/assets/contact-DfmO7KCz.js"
  },
  "/assets/external-link-D74-g5PE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-DKFbRESliJRxVfEufyIKzO9jHDo"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 252,
    "path": "../public/assets/external-link-D74-g5PE.js"
  },
  "/assets/eye-YlHEFZlL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-s6sUTQ3pe4V6cf21PqcGjx4PEv0"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 257,
    "path": "../public/assets/eye-YlHEFZlL.js"
  },
  "/assets/faqs-BR5u14Q4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aba-zrv09dwFB5wekSIjl8rNwTVpBVg"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 2746,
    "path": "../public/assets/faqs-BR5u14Q4.js"
  },
  "/assets/file-text-BcvVgFsc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"182-kLi/13OrP1SHoIzBUDQBrZvtcVQ"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 386,
    "path": "../public/assets/file-text-BcvVgFsc.js"
  },
  "/assets/gallery-B1T50ulC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29c3-sqA7Zfe0yDIUN72/2xnkyKZddms"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 10691,
    "path": "../public/assets/gallery-B1T50ulC.js"
  },
  "/assets/grip-vertical-BgBDoKWW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3c7-LoVjXO/0Poc8bQ9TWCDNe5Fm1r0"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 967,
    "path": "../public/assets/grip-vertical-BgBDoKWW.js"
  },
  "/assets/heart-D_5zxcS8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"301-9XWWdd4dZ0J5Q3nn5vzXClTNVCs"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 769,
    "path": "../public/assets/heart-D_5zxcS8.js"
  },
  "/assets/heart-handshake-DgQ3TJ_E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c9-7GpftWaF2wgAazvUh/UlZwJipO8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 713,
    "path": "../public/assets/heart-handshake-DgQ3TJ_E.js"
  },
  "/assets/hero-consultation-BuAy9A4C.jpg": {
    "type": "image/jpeg",
    "etag": '"ba35-mVY6GYTXXMQcx/+rcFfZG4te3iw"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 47669,
    "path": "../public/assets/hero-consultation-BuAy9A4C.jpg"
  },
  "/assets/image-to-webp-B0y_tNyI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3f3-LWTO90V3L0KMMkBGSN5i6HiUUns"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 1011,
    "path": "../public/assets/image-to-webp-B0y_tNyI.js"
  },
  "/assets/image-upload-BTJ9kqNm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"704-emVRvGLGTibN257G6/RKIjdUiB8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 1796,
    "path": "../public/assets/image-upload-BTJ9kqNm.js"
  },
  "/assets/inbox-otbJBJ5R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d7-SxWCmGaDen19k6tZ/wbxBncuRGs"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 471,
    "path": "../public/assets/inbox-otbJBJ5R.js"
  },
  "/assets/index-icujRWa3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1639b-D1KcRRMNAU4lRrs1YXufmnQYvWU"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 91035,
    "path": "../public/assets/index-icujRWa3.js"
  },
  "/assets/loader-circle-yRpSwEeG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"20f-yMV4C5afMa0dDt3tL8v91bvARIQ"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 527,
    "path": "../public/assets/loader-circle-yRpSwEeG.js"
  },
  "/assets/message-circle-cqM3eORc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f2-HzlEBfAG6smInVUKIobL506LrnY"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 242,
    "path": "../public/assets/message-circle-cqM3eORc.js"
  },
  "/assets/minus-ktCbCDrQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"76-bqZq59GZPRhIpSuvo9TtUCK/J00"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 118,
    "path": "../public/assets/minus-ktCbCDrQ.js"
  },
  "/assets/pencil-CaPDFZY8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-/+BcMY+H14reG+Q39eHli1nNQNw"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 277,
    "path": "../public/assets/pencil-CaPDFZY8.js"
  },
  "/assets/play-BPu78BLq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bf-hqBZX50HiS2YZJujH5hjrMhOIYY"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 191,
    "path": "../public/assets/play-BPu78BLq.js"
  },
  "/assets/plus-B5nY19RC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-ydHONZXIdMZwld/m0cq/T/f+DJY"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 154,
    "path": "../public/assets/plus-B5nY19RC.js"
  },
  "/assets/power-B9uwREp7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-0SnZlFeUttBzMVnzTOaE5fSTieQ"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 174,
    "path": "../public/assets/power-B9uwREp7.js"
  },
  "/assets/privacy-policy-DBSzmTha.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b8e-/XNkYKKxGTWoCleKk5HTqH8v5OY"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 2958,
    "path": "../public/assets/privacy-policy-DBSzmTha.js"
  },
  "/assets/process-steps-DHPWCuFl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10cc-qPCpZdmDZz2p2slCN0NV5A5gOW8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 4300,
    "path": "../public/assets/process-steps-DHPWCuFl.js"
  },
  "/assets/quote-D-8VoVU9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186-vH4/HDGZyaRwsaijO1J5io9sV2I"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 390,
    "path": "../public/assets/quote-D-8VoVU9.js"
  },
  "/assets/rich-text-editor-DO5CMbGJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6fe15-SKWOd1kycgQrCJoD/SO6BJOj5f8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 458261,
    "path": "../public/assets/rich-text-editor-DO5CMbGJ.js"
  },
  "/assets/save-BjveyghI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-qn/4id0p3NPlnBNHqqXZZxhon4M"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 328,
    "path": "../public/assets/save-BjveyghI.js"
  },
  "/assets/search-CYFDqWFy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"af-1vDoEaznhCfhR9JmJ67i8yak+BM"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 175,
    "path": "../public/assets/search-CYFDqWFy.js"
  },
  "/assets/services._slug-BZ2ejPXl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18f1-R3X4KVg2RoQeY4WuDdyyDoKm0wU"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 6385,
    "path": "../public/assets/services._slug-BZ2ejPXl.js"
  },
  "/assets/services.index-H08ZETPy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"220b-zQ7XVeM4i3JGaMGGjGM1qaSLvOU"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 8715,
    "path": "../public/assets/services.index-H08ZETPy.js"
  },
  "/assets/star-CUTLReQ_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-6y76BANP+MNxN+rLlcNRBKW1OWM"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 473,
    "path": "../public/assets/star-CUTLReQ_.js"
  },
  "/assets/stethoscope-XUhV7X6r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"157-hZ185JKXiaWQH0CsiT9Oakpu6aI"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 343,
    "path": "../public/assets/stethoscope-XUhV7X6r.js"
  },
  "/assets/styles-DC1gg5Yo.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"29754-9p0cfROZryBLKpKmSvxOC+3akmw"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 169812,
    "path": "../public/assets/styles-DC1gg5Yo.css"
  },
  "/assets/services-CQP_FuXV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-xBC2y1kzHawtODq34UE7lUbHJHY"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 95,
    "path": "../public/assets/services-CQP_FuXV.js"
  },
  "/assets/success-stories-BcFHlDXJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d01-jhd5zExcrWR2OVlKm97nAGEmDRQ"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 3329,
    "path": "../public/assets/success-stories-BcFHlDXJ.js"
  },
  "/assets/team._doctorSlug-BO5aKSlN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"99-S4iemh3R01HB0kQIzDb9ENVMSy0"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 153,
    "path": "../public/assets/team._doctorSlug-BO5aKSlN.js"
  },
  "/assets/team._doctorSlug-BTrb4lDk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c-4Vb3P4Uujp2N1NKm9hwRlc5dAEM"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 156,
    "path": "../public/assets/team._doctorSlug-BTrb4lDk.js"
  },
  "/assets/index-Br3Jnrrq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bb967-XwOlM7rrWndxA+uWv7HtNVWGvFY"',
    "mtime": "2026-08-04T05:56:07.514Z",
    "size": 768359,
    "path": "../public/assets/index-Br3Jnrrq.js"
  },
  "/assets/lucide-react-elA2DhXY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8b574-sf2JRmBykvs/XQgHpm4Bhoi7V2U"',
    "mtime": "2026-08-04T05:56:07.532Z",
    "size": 570740,
    "path": "../public/assets/lucide-react-elA2DhXY.js"
  },
  "/assets/team._doctorSlug-BqJuiVtB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d06-TyJK5mtge5o9fCu47A9X3duJVK8"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 3334,
    "path": "../public/assets/team._doctorSlug-BqJuiVtB.js"
  },
  "/assets/team.index-BQTfF1qa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"edd-b4yK41qF2mcWw7CQsMBjQhlaQ34"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 3805,
    "path": "../public/assets/team.index-BQTfF1qa.js"
  },
  "/assets/testimonial-family-COcZ_sxy.jpg": {
    "type": "image/jpeg",
    "etag": '"1b890-jj/oBoFT99BdEqMv64rHXoSbp98"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 112784,
    "path": "../public/assets/testimonial-family-COcZ_sxy.jpg"
  },
  "/assets/trash-2-B75v_cO3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"149-QzIDPukQQKOhgBCAFH/TXOT4H5g"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 329,
    "path": "../public/assets/trash-2-B75v_cO3.js"
  },
  "/assets/twitter-BvIUHSdA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2af-sintKrfw1SmIp3uBAz3peEdq6LY"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 687,
    "path": "../public/assets/twitter-BvIUHSdA.js"
  },
  "/assets/undo-BdYwmHBy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f55-WokOtEsrOw5/t3Q9eFFQGp/Letc"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 3925,
    "path": "../public/assets/undo-BdYwmHBy.js"
  },
  "/assets/upload-BTLoxRjE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-JTOWfpUoKK54HWnx+yj2cL2lYME"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 231,
    "path": "../public/assets/upload-BTLoxRjE.js"
  },
  "/assets/use-admin-auth-Bbr-hRy7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"250c-/KartlB3zSV2caNgYiBJVAEPGrk"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 9484,
    "path": "../public/assets/use-admin-auth-Bbr-hRy7.js"
  },
  "/assets/use-cms-content-DZE2CL6a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"504-YpvGd+wgS8GV8olpxuk29PPJpkM"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 1284,
    "path": "../public/assets/use-cms-content-DZE2CL6a.js"
  },
  "/assets/use-doctors-DGK81BNH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ee-gXBAP6+f+REIxSUWI0LSPzgk/Xk"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 494,
    "path": "../public/assets/use-doctors-DGK81BNH.js"
  },
  "/assets/user-round-zZ7-_QvB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"91a-+3IJ5fGFOBXYgVuNyE8OA1saT3w"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 2330,
    "path": "../public/assets/user-round-zZ7-_QvB.js"
  },
  "/assets/users-D3fDCH_8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-e8EsQOXoErENfaUJh4cUlgcRb/4"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 307,
    "path": "../public/assets/users-D3fDCH_8.js"
  },
  "/assets/video-modal-DVLX04Ex.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"60d-hwq4dg/SnZodFtgTwCjFVwLUe2I"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 1549,
    "path": "../public/assets/video-modal-DVLX04Ex.js"
  },
  "/assets/visit-care-mUD-BhkN.jpg": {
    "type": "image/jpeg",
    "etag": '"d26b-HrH8nLjQvTJNLuFqeNsVytLWroA"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 53867,
    "path": "../public/assets/visit-care-mUD-BhkN.jpg"
  },
  "/assets/visit-hope-oR7-wZKn.jpg": {
    "type": "image/jpeg",
    "etag": '"705f-q8xIAfar9663WqUirNEM9PAflSw"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 28767,
    "path": "../public/assets/visit-hope-oR7-wZKn.jpg"
  },
  "/assets/visit-video-BYCz8Ri3.jpg": {
    "type": "image/jpeg",
    "etag": '"b959-dyEqpxijzBXJcoQSnWM1l+Dmtds"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 47449,
    "path": "../public/assets/visit-video-BYCz8Ri3.jpg"
  },
  "/assets/who-clinic-C08D0FBc.jpg": {
    "type": "image/jpeg",
    "etag": '"a995-Zd1w9DGDvVN4aFVMdQruGSUGk04"',
    "mtime": "2026-08-04T05:56:07.471Z",
    "size": 43413,
    "path": "../public/assets/who-clinic-C08D0FBc.jpg"
  },
  "/assets/who-team-B5bqQWRE.jpg": {
    "type": "image/jpeg",
    "etag": '"ef4c-fKum99DA9R6fSXE/fuWMJ8+HS4o"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 61260,
    "path": "../public/assets/who-team-B5bqQWRE.jpg"
  },
  "/assets/why-us._slug-DsD8FlHP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"99-S4iemh3R01HB0kQIzDb9ENVMSy0"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 153,
    "path": "../public/assets/why-us._slug-DsD8FlHP.js"
  },
  "/assets/why-us._slug-DgM0gwsk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e4d-Pu+o8VdW4yGBQC3waI3ikeTeOkA"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 3661,
    "path": "../public/assets/why-us._slug-DgM0gwsk.js"
  },
  "/assets/why-us._slug-wNKZf22j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95-GktRStiVZnOd63hqIqp1/k/vThg"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 149,
    "path": "../public/assets/why-us._slug-wNKZf22j.js"
  },
  "/assets/youtube-id-COWL1nLO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14c-MTaZFUDZzOoLDgNRs6ebEU+7RQs"',
    "mtime": "2026-08-04T05:56:07.507Z",
    "size": 332,
    "path": "../public/assets/youtube-id-COWL1nLO.js"
  }
};
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key, value);
  }
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_Oabfml = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_Oabfml };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function useNitroHooks() {
  const nitroApp = useNitroApp();
  const hooks = nitroApp.hooks;
  if (hooks) {
    return hooks;
  }
  return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function createHandler(hooks) {
  const nitroApp = useNitroApp();
  const nitroHooks = useNitroHooks();
  return {
    async fetch(request, env, context) {
      globalThis.__env__ = env;
      augmentReq(request, {
        env,
        context
      });
      const ctxExt = {};
      const url = new URL(request.url);
      if (hooks.fetch) {
        const res = await hooks.fetch(request, env, context, url, ctxExt);
        if (res) {
          return res;
        }
      }
      return await nitroApp.fetch(request);
    },
    scheduled(controller, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
        controller,
        env,
        context
      }) || Promise.resolve());
    },
    email(message, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:email", {
        message,
        event: message,
        env,
        context
      }) || Promise.resolve());
    },
    queue(batch, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
        batch,
        event: batch,
        env,
        context
      }) || Promise.resolve());
    },
    tail(traces, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
        traces,
        env,
        context
      }) || Promise.resolve());
    },
    trace(traces, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
        traces,
        env,
        context
      }) || Promise.resolve());
    }
  };
}
function augmentReq(cfReq, ctx) {
  const req = cfReq;
  req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
  req.runtime ??= { name: "cloudflare" };
  req.runtime.cloudflare = {
    ...req.runtime.cloudflare,
    ...ctx
  };
  req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
const cloudflareModule = createHandler({ fetch(cfRequest, env, context, url) {
  if (env.ASSETS && isPublicAssetURL(url.pathname)) {
    return env.ASSETS.fetch(cfRequest);
  }
} });
export {
  cloudflareModule as default
};
