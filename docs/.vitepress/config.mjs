import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SenoSpace Documentation",
  description: "Documentation on device management and configuration",
  srcDir: './src',
  themeConfig: {
    logo: '/assets/logo/logo_full.png',
    siteTitle: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/technologies/' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          {
            text: 'Wireless Technology',
            link: '/technologies/',
            collapsed: true,
            items: [
              {
                text: 'LoRAWAN',
                link: '/technologies/lorawan/'
              },
              {
                text: 'BLE',
                link: '/technologies/ble/'
              },
              {
                text: 'SenoSpace Framework',
                link: '/technologies/senospace-framework/'
              },
            ]
          },
        ]
      },
      {
        text: 'Devices',
        collapsed: false,            
            items: [
              {
                text: 'SmartSense Pro',
                link: '/devices/smartsense-pro/',
                collapsed: false,
                items: [
                  {
                    text: 'Datasheet',
                    link: '/devices/smartsense-pro/datasheet/'
                  },
                  {
                    text: 'User Guide',
                    link: '/devices/smartsense-pro/user-guide/'
                  },
                  {
                    text: 'Uplink',
                    link: '/devices/smartsense-pro/uplink/'
                  },
                  {
                    text: 'Downlink',
                    link: '/devices/smartsense-pro/uplink/'
                  },
                  {
                    text: 'AT Commands',
                    link: '/devices/smartsense-pro/at-commands/'
                  },
                ]
              },
              {
                text: 'SmartBeacon',
                link: '/devices/smartbeacon/',
                collapsed: false,
              },
              {
                text: 'SmartBridge',
                link: '/devices/smartbridge/',
                collapsed: false,
              },
              {
                text: 'SmartSense - Coming Soon',
                link: '/devices/smartsense/',
                collapsed: false,
              },
            ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/senospace/website-documentation' }
    ]
  }
})
