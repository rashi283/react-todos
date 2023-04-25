import React, { FC, useState } from 'react'
import styled from '@emotion/styled'

export const Wrapper = styled.label({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  width: '100%',
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: 'white',
  fontWeight: '400',
  fontSize: 14,
  cursor: 'pointer',
  overflow: 'hidden',
})

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
})

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? 'line-through' : 'none',
  fontSize: 20,
  margin: 0,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
}))

const Cross = styled.span<{ hover: boolean }>(({ hover }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: hover ? '15px' : '-30px',
  transition: 'all 0.2s ease-out',
  background: '#eeeeee',
  borderRadius: '100%',
  padding: '10px',
  width: '30px',
  height: '30px',
}))

export interface TodoItemProps {
  id: string
  label: string
  checked?: boolean
  onChange: ({ id, checked }: { id: string; checked: boolean }) => void
  onRemove: ({ id }: { id: string }) => void
}

export const TodoItem: FC<TodoItemProps> = ({ id, label, checked = false, onChange, onRemove }) => {
  const [hover, setHover] = useState(false)

  return (
    <Wrapper onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange({ id, checked: e.target.checked })}
      />
      <Label checked={checked}>{label}</Label>
      <Cross hover={hover} onClick={() => onRemove({ id })}>
        X
      </Cross>
    </Wrapper>
  )
}
