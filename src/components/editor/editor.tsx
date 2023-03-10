import React, { memo, useEffect, useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import { tools } from './tools'

interface Props {
  data?: OutputData
  onChange(val: OutputData): void
  holder: string
  readonly: boolean
}

const Editor = ({ data, onChange, holder, readonly }: Props) => {
  const ref = useRef<EditorJS>() //add a reference to editor

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: tools,
        readOnly: readonly,
        data,
        async onChange(api, event) {
          const data = await api.saver.save()
          onChange(data)
        },
      })
      ref.current = editor
    }
    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [])
  return <div id={holder} />
}
export default memo(Editor)
