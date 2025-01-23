import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Git-protocol',
  tagline: 'Understanding the git protocol is cool',
  favicon: 'img/octopus.jpeg',

  // Set the production url of your site here
  url: 'https://codecrafters.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'i27ae15', // Usually your GitHub org/user name.
  projectName: 'git-protocol', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/i27ae15/git-protocol',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/octopus.jpeg',
    navbar: {
      title: 'Git Protocol',
      logo: {
        alt: 'My Site Logo',
        src: 'img/octopus.jpeg',
      },
      items: [
        {to: '/docs/objects/blob', label: 'Objects', position: 'left'},
        {to: '/docs/git-protocol/intro', label: 'Git-Protocol', position: 'left'},
        {
          href: 'https://github.com/i27ae15/git-protocol',
          label: 'Doc Repository',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Collaborate',
          items: [
            {
              label: 'Doc Repository',
              href: 'https://github.com/i27ae15/git-protocol'
            }
          ]
        },
        {
          title: 'Implementations',
          items: [
            {
              label: 'Git',
              href: 'https://github.com/i27ae15/git',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
