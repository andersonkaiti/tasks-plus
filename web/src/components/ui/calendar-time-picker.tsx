'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CalendarTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  dateLabel?: string
  timeLabel?: string
  disabled?: boolean
}

export default function CalendarTimePicker({
  value,
  onChange,
  dateLabel = 'Data',
  timeLabel = 'Hora',
  disabled = false,
}: CalendarTimePickerProps) {
  const [open, setOpen] = useState(false)
  const [internalDate, setInternalDate] = useState<Date | undefined>(value)
  const [timeValue, setTimeValue] = useState<string>('')

  useEffect(() => {
    setInternalDate(value)
    if (value) {
      const hours = value.getHours().toString().padStart(2, '0')
      const minutes = value.getMinutes().toString().padStart(2, '0')
      const seconds = value.getSeconds().toString().padStart(2, '0')
      setTimeValue(`${hours}:${minutes}:${seconds}`)
    } else {
      setTimeValue('00:00:00')
    }
  }, [value])

  const updateDateTime = (newDate?: Date, newTime?: string) => {
    if (!newDate && !newTime) {
      onChange?.(undefined)
      return
    }

    const baseDate = newDate || internalDate || new Date()
    const time = newTime || timeValue

    if (time) {
      const [hours, minutes, seconds] = time.split(':').map(Number)
      const combined = new Date(baseDate)
      combined.setHours(hours || 0, minutes || 0, seconds || 0, 0)
      onChange?.(combined)
    } else {
      onChange?.(baseDate)
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    setInternalDate(date)
    updateDateTime(date, timeValue)
    setOpen(false)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setTimeValue(newTime)
    updateDateTime(internalDate, newTime)
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          {dateLabel}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-36 justify-between font-normal"
              disabled={disabled}
            >
              {internalDate
                ? internalDate.toLocaleDateString('pt-BR')
                : 'Selecionar data'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={internalDate}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          {timeLabel}
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={timeValue}
          onChange={handleTimeChange}
          disabled={disabled}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
