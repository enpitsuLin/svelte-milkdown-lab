<script lang="ts">
  import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core'
  import { commonmark } from '@milkdown/preset-commonmark'
  import { nord } from '@milkdown/theme-nord'
  import { menu, menuConfigCtx, type MenuConfigItem } from '@milkdown-lab/plugin-menu'

  const markdown = `# Milkdown Svelte Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Svelte**.`

  const menuItems: MenuConfigItem[][] = [
    [
      {
        type: 'select',
        text: 'Heading',
        options: [
          { id: 1, content: 'Large Heading' },
          { id: 2, content: 'Medium Heading' },
          { id: 3, content: 'Small Heading' },
          { id: 0, content: 'Plain Text' },
        ],
        // return [commandKey,payload] or commandKey
        onSelect: (id) => (!!id ? ['WrapInHeading', id] : 'TurnIntoText'),
      },
    ],
    [
      {
        type: 'button',
        content: 'B',
        // commandKey
        key: 'ToggleStrong',
      },
      {
        type: 'button',
        content: 'I',
        key: 'ToggleEmphasis',
      },
      {
        type: 'button',
        content: 'S',
        key: 'ToggleStrikeThrough',
      },
    ],
  ]

  function editor(dom) {
    Editor.make()
      .config((ctx) => {
        ctx.set(menuConfigCtx.key, {
          attributes: { class: 'milkdown-menu', 'data-menu': 'true' },
          items: menuItems,
        })
        ctx.set(rootCtx, dom)
        ctx.set(defaultValueCtx, markdown)
      })
      .config(nord)
      .use(menu)
      .use(commonmark)
      .create()
  }
</script>

<main>
  <div use:editor />
</main>
