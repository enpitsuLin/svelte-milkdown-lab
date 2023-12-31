<script lang="ts">
  import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core'
  import { commonmark } from '@milkdown/preset-commonmark'
  import { nord } from '@milkdown/theme-nord'
  import { menu, menuConfigCtx, type MenuConfigItem } from '@milkdown-lab/plugin-menu'
  import { editorStateCtx, schemaCtx } from '@milkdown/core'
  import { Ctx } from '@milkdown/ctx'
  import { MarkType } from '@milkdown/prose/model'
  import { EditorState } from '@milkdown/prose/state'

  const browser = typeof window !== 'undefined'

  const createIconContent = (icon: string) => {
    if (!browser) return null
    const span = document.createElement('span')
    span.className = 'material-icons material-icons-outlined'
    span.textContent = icon
    return span
  }

  const hasMark = (state: EditorState, type: MarkType | undefined): boolean => {
    if (!type) return false
    const { from, $from: _from, to, empty } = state.selection
    if (empty) return !!type.isInSet(state.storedMarks || _from.marks())

    return state.doc.rangeHasMark(from, to, type)
  }

  const markdown = `# Milkdown Svelte Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Svelte**.`

  const menuItems: MenuConfigItem[][] = [
    [
      {
        type: 'button',
        content: createIconContent('turn_left'),
        key: 'Undo',
        disabled: (ctx) => {
          try {
            if (!ctx.get('historyProviderConfig')) {
              return true
            }
          } catch (error) {
            return false
          }
          return false
        },
      },
      {
        type: 'button',
        content: createIconContent('turn_right'),
        key: 'Redo',
        disabled: (ctx) => {
          try {
            if (!ctx.get('historyProviderConfig')) {
              return true
            }
          } catch (error) {
            return false
          }
          return false
        },
      },
    ],
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
        onSelect: (id) => (!!id ? ['WrapInHeading', id] : 'TurnIntoText'),
      },
    ],
    [
      {
        type: 'button',
        content: createIconContent('format_bold'),
        key: 'ToggleStrong',
        active: (ctx) => {
          const state = ctx.get(editorStateCtx)
          const schema = ctx.get(schemaCtx)
          return hasMark(state, schema.marks.strong)
        },
      },
      {
        type: 'button',
        content: createIconContent('format_italic'),
        key: 'ToggleEmphasis',
        active: (ctx) => {
          const state = ctx.get(editorStateCtx)
          const schema = ctx.get(schemaCtx)
          return hasMark(state, schema.marks.emphasis)
        },
      },
      {
        type: 'button',
        content: createIconContent('strikethrough_s'),
        key: 'ToggleStrikeThrough',
        active: (ctx) => {
          const state = ctx.get(editorStateCtx)
          const schema = ctx.get(schemaCtx)
          return hasMark(state, schema.marks.strike_through)
        },
      },
    ],
    [
      {
        type: 'button',
        content: createIconContent('format_list_bulleted'),
        key: 'WrapInBulletList',
      },
      {
        type: 'button',
        content: createIconContent('format_list_numbered'),
        key: 'WrapInOrderedList',
      },
      // Notice: didn't provider any more in preset-gfm after v7
      // {
      //   type: 'button',
      //   content: createIconContent('checklist'),
      //   key: 'TurnIntoTaskList',
      // },
      {
        type: 'button',
        content: createIconContent('format_indent_decrease'),
        key: 'SplitListItem',
      },
      {
        type: 'button',
        content: createIconContent('format_indent_increase'),
        key: 'SinkListItem',
      },
    ],
    [
      // Notice: this two command work properly, but maybe need improve UX
      // {
      //   type: 'button',
      //   content: createIconContent('link'),
      //   key: ['ToggleLink', { href: '' }],
      // },
      //
      // {
      //   type: 'button',
      //   content: createIconContent('image'),
      //   key: 'InsertImage',
      // },
      {
        type: 'button',
        content: createIconContent('table_chart'),
        key: 'InsertTable',
      },
      {
        type: 'button',
        content: createIconContent('code'),
        key: 'CreateCodeBlock',
      },
    ],
    [
      {
        type: 'button',
        content: createIconContent('format_quote'),
        key: 'WrapInBlockquote',
      },
      {
        type: 'button',
        content: createIconContent('horizontal_rule'),
        key: 'InsertHr',
      },
      // TODO:provide command by this package?
      // {
      //   type: 'button',
      //   content: createIconContent('select_all'),
      //   key: 'SelectParent',
      // },
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
