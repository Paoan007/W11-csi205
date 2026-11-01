'use client'

import { useState, useEffect } from 'react'
import './calculator.css'

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0')
  const [first, setFirst] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waiting, setWaiting] = useState(false)
  const [lastNumber, setLastNumber] = useState<number | null>(null)
  const [repeatCalculation, setRepeatCalculation] = useState(false)

  // จัดรูปแบบตัวเลขและคั่นหลักพัน
  const renderNumber = (value: number): string => {
    if (!Number.isFinite(value)) return 'Error'
    return String(Number(value.toPrecision(10)))
  }

  const insertSeparater = (
    str: string,
    separator = ' ',
    groupSize = 3
  ): string => {
    const parts = str.split('.')
    const integerPart = parts[0]
    const sign = integerPart.startsWith('-') ? '-' : ''
    const digits = sign ? integerPart.slice(1) : integerPart

    let resultString = ''
    let count = 0

    for (let i = digits.length - 1; i >= 0; i--) {
      resultString = digits[i] + resultString
      count++

      if (i > 0 && count % groupSize === 0) {
        resultString = separator + resultString
      }
    }

    return sign + resultString +
      (parts.length > 1 ? '.' + parts[1] : '')
  }

  // แสดงตัวเลขบนหน้าจอ
  const render = (): string => {
    if (display === 'Error') return display
    return insertSeparater(display)
  }

  // ป้อนตัวเลข
  const numberClick = (num: string) => {
    if (display === 'Error' || waiting || display === '0') {
      setDisplay(num)
      setWaiting(false)
      setRepeatCalculation(false)
      return
    }

    if (display.replace(/[-.]/g, '').length < 15) {
      setDisplay(display + num)
      setRepeatCalculation(false)
    }
  }

  // ป้อนจุดทศนิยม
  const decimalClick = () => {
    if (display === 'Error' || waiting) {
      setDisplay('0.')
      setWaiting(false)
      setRepeatCalculation(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
      setRepeatCalculation(false)
    }
  }

  // คำนวณบวกและลบ
  const calculateResult = (
    a: number,
    b: number,
    op: string
  ): number => {
    if (op === '+') return a + b
    if (op === '-') return a - b
    return b
  }

  // เลือกตัวดำเนินการ
  const operatorClick = (op: string) => {
    if (display === 'Error') return

    // ถ้ามีการคำนวณค้างอยู่ ให้คำนวณก่อน
    if (first !== null && operator && !waiting) {
      const result = calculateResult(
        first,
        Number(display),
        operator
      )

      setDisplay(renderNumber(result))
      setFirst(result)
    } else if (first === null) {
      setFirst(Number(display))
    }

    setOperator(op)
    setWaiting(true)
    setRepeatCalculation(false)
  }

  // ปุ่มเท่ากับ และคำนวณซ้ำด้วยตัวเลขเดิม
  const calculate = () => {
    if (display === 'Error' || !operator) return

    // คำนวณครั้งแรก เช่น 5 + 3 = 8
    if (first !== null) {
      const second = waiting
        ? first
        : Number(display)

      const result = calculateResult(
        first,
        second,
        operator
      )

      setLastNumber(second)
      setDisplay(renderNumber(result))
      setFirst(null)
      setWaiting(true)
      setRepeatCalculation(true)
      return
    }

    // กด = ซ้ำ เช่น 8 + 3 = 11
    if (repeatCalculation && lastNumber !== null) {
      const result = calculateResult(
        Number(display),
        lastNumber,
        operator
      )

      setDisplay(renderNumber(result))
      setWaiting(true)
    }
  }

  // ล้างตัวเลขปัจจุบัน
  const clearEntry = () => {
    setDisplay('0')
    setWaiting(false)
    setRepeatCalculation(false)
  }

  // ล้างค่าทั้งหมด
  const clear = () => {
    setDisplay('0')
    setFirst(null)
    setOperator(null)
    setWaiting(false)
    setLastNumber(null)
    setRepeatCalculation(false)
  }

  // เปลี่ยนเครื่องหมายบวก/ลบ
  const toggleSign = () => {
    if (display === 'Error' || Number(display) === 0) return

    setDisplay(
      display.startsWith('-')
        ? display.slice(1)
        : '-' + display
    )
    setRepeatCalculation(false)
  }

  // ลบตัวเลขตัวสุดท้าย
  const backspace = () => {
    if (display === 'Error' || waiting) {
      setDisplay('0')
      setWaiting(false)
      setRepeatCalculation(false)
      return
    }

    const next = display.slice(0, -1)

    setDisplay(
      next === '' || next === '-'
        ? '0'
        : next
    )
    setRepeatCalculation(false)
  }

  // จัดการคีย์บอร์ด
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      const key = event.key

      if (/^\d$/.test(key)) {
        event.preventDefault()
        numberClick(key)
        return
      }

      switch (key) {
        case '+':
        case '-':
          event.preventDefault()
          operatorClick(key)
          break

        case 'Enter':
        case '=':
          event.preventDefault()
          calculate()
          break

        case '.':
        case ',':
          event.preventDefault()
          decimalClick()
          break

        case 'Backspace':
          event.preventDefault()
          backspace()
          break

        case 'Escape':
          event.preventDefault()
          clear()
          break

        case 'Delete':
          event.preventDefault()
          clearEntry()
          break
      }
    }

    window.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('keydown', handleKeyboard)
    }
  })

  // รายการปุ่ม
  const keys = [
    { label: 'Mc', kind: 'green', disabled: true },
    { label: 'Mn', kind: 'green', disabled: true },
    { label: 'M+', kind: 'green', disabled: true },
    { label: 'M-', kind: 'green', disabled: true },
    {
      label: display === '0' ? 'CE' : 'C',
      kind: 'red',
      action: display === '0' ? clearEntry : clear,
    },

    { label: '7', kind: 'purple', action: () => numberClick('7') },
    { label: '8', kind: 'purple', action: () => numberClick('8') },
    { label: '9', kind: 'purple', action: () => numberClick('9') },
    { label: '÷', kind: 'green', disabled: true },
    { label: '√', kind: 'green', disabled: true },

    { label: '4', kind: 'purple', action: () => numberClick('4') },
    { label: '5', kind: 'purple', action: () => numberClick('5') },
    { label: '6', kind: 'purple', action: () => numberClick('6') },
    { label: '×', kind: 'green', disabled: true },
    { label: '%', kind: 'green', disabled: true },

    { label: '1', kind: 'purple', action: () => numberClick('1') },
    { label: '2', kind: 'purple', action: () => numberClick('2') },
    { label: '3', kind: 'purple', action: () => numberClick('3') },
    { label: '−', kind: 'green', action: () => operatorClick('-') },
    { label: '1/x', kind: 'green', disabled: true },

    { label: '0', kind: 'purple', action: () => numberClick('0') },
    { label: '.', kind: 'purple', action: decimalClick },
    { label: '+/−', kind: 'purple', action: toggleSign },
    { label: '+', kind: 'green', action: () => operatorClick('+') },
    { label: '=', kind: 'green', action: calculate },
  ]

  return (
    <main className="calculator-page">
      <div className="calculator">
        <div className="calculator-outer">
          <div className="calculator-inner">
            <div className="calculator-screen" aria-live="polite">
              {render()}
            </div>

            <div className="calculator-buttons">
              {keys.map((key, index) => (
                <button
                  key={`${key.label}-${index}`}
                  type="button"
                  className={key.kind}
                  disabled={key.disabled}
                  onClick={key.action}
                  aria-label={key.label}
                  title={key.label}
                >
                  {key.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
