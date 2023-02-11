import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const bodyField = {
  name: 'body',
  widget: 'markdown',
  label: 'Body',
};

const seo = {
  name: 'seo',
  label: 'Seo',
  widget: 'object',
  summary: '{{fields.title}}',
  fields: [
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      widget: 'string',
    },
    {
      name: 'image',
      label: 'Image',
      widget: 'image',
      required: false,
    },
  ],
};

const makeLayoutField = (name) => ({
  name: 'layout',
  widget: 'select',
  default: `../layouts/${name}.astro`,
  options: [{
    label: name,
    value: `../layouts/${name}.astro`,
  }],
});
const galleryField = {
  name: 'images',
  widget: 'list',
  label: 'Gallery images',
  summary: '{{fields.title}}',
  fields: [{
    name: 'src',
    widget: 'image',
    label: 'Image',
  }, {
    name: 'title',
    widget: 'string',
    label: 'Title',
  }, {
    name: 'alt',
    widget: 'string',
    label: 'Alt text',
  }],
};
// https://astro.build/config
export default defineConfig({
  integrations: [NetlifyCMS({
    config: {
      // Use Netlify’s “Git Gateway” authentication and target our default branch
      backend: {
        name: 'git-gateway',
        branch: 'latest',
      },
      // Configure where our media assets are stored & served from
      media_folder: 'public/assets/blog',
      public_folder: '/assets/blog',
      // Configure the content collections
      collections: [{
        name: 'pages',
        label: 'Pages',
        format: 'frontmatter',
        files: [
          {
            name: 'home',
            label: 'Home',
            file: 'src/pages/index.md',
            fields: [
              {
                name: 'services',
                label: 'Services',
                label_singular: 'Service',
                widget: 'list',
                required: false,
                fields: [
                  {
                    name: 'name',
                    label: 'Service name',
                    widget: 'string',
                  }, {
                    name: 'image',
                    label: 'Service image',
                    widget: 'image',
                  },
                ],
              },
            ],
          },
          {
            name: 'about',
            label: 'About',
            file: 'src/pages/about.md',
            fields: [
              galleryField,
            ],
          },
        ].map((page) => ({
          ...page,
          fields: [
            bodyField,
            ...page.fields,
            seo,
            makeLayoutField(page.label),
          ],
        })),
      }, {
        name: 'posts',
        label: 'Blog Posts',
        label_singular: 'Blog Post',
        folder: 'src/pages/posts',
        create: true,
        delete: true,
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'Post Title',
        }, {
          name: 'publishDate',
          widget: 'datetime',
          format: 'DD MMM YYYY',
          date_format: 'DD MMM YYYY',
          time_format: false,
          label: 'Publish Date',
        }, {
          name: 'author',
          widget: 'string',
          label: 'Author Name',
          required: false,
        }, {
          name: 'authorURL',
          widget: 'string',
          label: 'Author URL',
          required: false,
        }, {
          name: 'description',
          widget: 'string',
          label: 'Description',
          required: false,
        }, {
          name: 'body',
          widget: 'markdown',
          label: 'Post Body',
        }, {
          name: 'layout',
          widget: 'select',
          default: '../../layouts/BlogPost.astro',
          options: [{
            label: 'Blog Post',
            value: '../../layouts/BlogPost.astro',
          }],
        }],
      }, {
        name: 'galleries',
        label: 'Galleries',
        label_singular: 'Gallery',
        folder: 'src/pages/galleries',
        create: true,
        delete: true,
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'Gallery Title',
        }, {
          name: 'images',
          widget: 'list',
          label: 'Gallery images',
          summary: '{{fields.title}}',
          fields: [{
            name: 'src',
            widget: 'image',
            label: 'Image',
          }, {
            name: 'title',
            widget: 'string',
            label: 'Title',
          }, {
            name: 'alt',
            widget: 'string',
            label: 'Alt text',
          }],
        },
        seo,
        makeLayoutField('Gallery'),
        ],
      }],
    },
    previewStyles: ['/src/styles/blog.css'],
  }), react(), tailwind()],
});
