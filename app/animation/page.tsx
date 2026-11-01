
'use client'

import { useEffect, useRef, useState } from 'react'

const FIELD_WIDTH = 640
const FIELD_HEIGHT = 480
const BALL_SIZE = 100
const SPEED = 200

const ballImages: Record<string, string> = {
  Basketball: '/assets/bk.png',
  Football: '/assets/fb.png',
  Volleyball: '/assets/volley.png',
  Face: '/assets/face.gif',
}

export default function Page() {
  const [ballType, setBallType] = useState('None')
  const [running, setRunning] = useState(false)
  const [position, setPosition] = useState({
    x: (FIELD_WIDTH - BALL_SIZE) / 2,
    y: (FIELD_HEIGHT - BALL_SIZE) / 2,
  })
  const [rotation, setRotation] = useState(0)

  const direction = useRef({ x: 1, y: 1 })

  // ควบคุมการเคลื่อนที่ของบอล
  useEffect(() => {
    if (!running) return

    const timer = setInterval(() => {
      setPosition((current) => {
        let x = current.x + direction.current.x * SPEED / 60 / Math.sqrt(2)
        let y = current.y + direction.current.y * SPEED / 60 / Math.sqrt(2)

        const maxX = FIELD_WIDTH - BALL_SIZE
        const maxY = FIELD_HEIGHT - BALL_SIZE

        if (x >= maxX) {
          x = maxX
          direction.current.x = -1
        } else if (x <= 0) {
          x = 0
          direction.current.x = 1
        }

        if (y >= maxY) {
          y = maxY
          direction.current.y = -1
        } else if (y <= 0) {
          y = 0
          direction.current.y = 1
        }

        return { x, y }
      })

      setRotation((prev) => prev + 6)
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [running])

  // รองรับ Space และปุ่ม 0-4
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        setRunning((prev) => !prev)
      }

      const types: Record<string, string> = {
        '0': 'None',
        '1': 'Basketball',
        '2': 'Football',
        '3': 'Volleyball',
        '4': 'Face',
      }

      if (types[event.key]) {
        setBallType(types[event.key])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const buttonStyle = (active: boolean) => ({
    padding: '10px 18px',
    fontSize: 16,
    border: '1px solid black',
    borderRadius: 6,
    cursor: 'pointer',
    background: active ? '#2878e8' : '#fff',
    color: active ? '#fff' : '#333',
  })

  return (
    <main
      style={{
        maxWidth: 660,
        margin: '12px auto',
        padding: '0 10px',
        fontFamily: 'Arial, sans-serif',
        color: '#222',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: 24,
          margin: '0 0 10px',
          fontWeight: 700,
        }}
      >
      </h1>

      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: `${FIELD_WIDTH} / ${FIELD_HEIGHT}`,
          border: '2px solid black',
          borderRadius: 5,
          overflow: 'hidden',
          backgroundImage: "url('/assets/wood.jpg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: `${(BALL_SIZE / FIELD_WIDTH) * 100}%`,
            aspectRatio: '1',
            left: `${(position.x / FIELD_WIDTH) * 100}%`,
            top: `${(position.y / FIELD_HEIGHT) * 100}%`,
            transform: `rotate(${rotation}deg)`,
            borderRadius: '50%',
            background: ballType === 'None' ? 'lightblue' : 'transparent',
            overflow: 'hidden',
          }}
        >
          {ballImages[ballType] && (
            <img
              src={ballImages[ballType]}
              alt={ballType}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          )}
        </div>
      </div>

      <div className="d-flex justify-content-between gap-4 mt-2"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 8,
        }}
      >
        <button
          onClick={() => setRunning((prev) => !prev)}
          style={{
            ...buttonStyle(running),
            background: running ? '#dc3545' : '#198754',
            color: '#fff',
            border: 'black',
          }}
        >
          {running ? 'Ⅱ Pause' : '▶ Play'}
        </button>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            gap: 8,
          }}
        >
          {['None', 'Basketball', 'Football', 'Volleyball', 'Face'].map(
            (type) => (
              <button
                key={type}
                onClick={() => setBallType(type)}
                style={buttonStyle(ballType === type)}
              >
                {type}
              </button>
            ),
          )}
        </div>
      </div>

      <p
        style={{
          textAlign: 'center',
          fontSize: 12,
          marginTop: 10,
          color: '#555',
        }}
      >
      </p>
    </main>
  )
}
