import { Select } from 'antd'
import React, { ComponentProps } from 'react'

interface IDSelectProps
  extends Omit<
    ComponentProps<typeof Select>,
    'value' | 'onChange' | 'placeholder' | 'options'
  > {
  value: number | string | null | undefined
  onChange?: (value?: number) => void
  placeholder?: string
  options?: { name: string; id: number }[]
}
export const IDSelect = (props: IDSelectProps) => {
  const { value, onChange, placeholder, options, ...restProps } = props
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      placeholder={placeholder}
      onChange={(value) => onChange?.(toNumber(value))}
    >
      {options?.map((item) => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        )
      })}
    </Select>
  )
}

const toNumber = (val: unknown) => (isNaN(Number(val)) ? 0 : Number(val))
