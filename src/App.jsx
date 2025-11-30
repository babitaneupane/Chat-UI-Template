import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const sampleContacts = [
  { id: 1, name: 'Alice Johnson', initials: 'AJ', online: true },
  { id: 2, name: 'Bob Martinez', initials: 'BM', online: false },
  { id: 3, name: 'Charlie Kim', initials: 'CK', online: true },
]

const sampleMessages = {
  1: [
    { id: 1, sender: 'Alice Johnson', text: 'Hey! Are you free to chat?', time: '09:12' },
    { id: 2, sender: 'me', text: "Sure — what's up?", time: '09:14' },
    { id: 3, sender: 'Alice Johnson', text: "Wanted to show you the new UI layout I built.", time: '09:15' },
  ],
  2: [
    { id: 4, sender: 'Bob Martinez', text: 'Ping me when you have a moment.', time: 'Yesterday' },
  ],
  3: [
    { id: 5, sender: 'Charlie Kim', text: 'Design review at 2pm.', time: 'Mon' },
  ],
}

function App() {
  const [selected, setSelected] = useState(1)
  const [dark, setDark] = useState(false)
  const [text, setText] = useState('')

  const contacts = sampleContacts
  const messages = sampleMessages[selected] ?? []

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand">
            <img src={viteLogo} alt="vite" className="mini-logo" />
            <img src={reactLogo} alt="react" className="mini-logo react" />
            <h2>Chat UI</h2>
          </div>
          <button className="toggle" onClick={() => setDark((d) => !d)}>
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>

        <div className="contacts">
          {contacts.map((c) => (
            <div
              key={c.id}
              className={"contact " + (selected === c.id ? 'active' : '')}
              onClick={() => setSelected(c.id)}
            >
              <div className="avatar">{c.initials}</div>
              <div className="meta">
                <div className="name">{c.name}</div>
                <div className="status">{c.online ? 'Online' : 'Offline'}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="chat">
        <div className="chat-header">
          <div className="contact-info">
            <div className="avatar large">{contacts.find((c) => c.id === selected)?.initials}</div>
            <div>
              <div className="name">{contacts.find((c) => c.id === selected)?.name}</div>
              <div className="status small">{contacts.find((c) => c.id === selected)?.online ? 'Online' : 'Offline'}</div>
            </div>
          </div>
          <div className="actions">
            <button className="icon">⋯</button>
          </div>
        </div>

        <div className="messages">
          {messages.map((m) => {
            const outgoing = m.sender === 'me'
            return (
              <div key={m.id} className={outgoing ? 'message outgoing' : 'message incoming'}>
                {!outgoing && <div className="avatar small">{m.sender.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>}
                <div className="bubble">
                  <div className="text">{m.text}</div>
                  <div className="time">{m.time}</div>
                </div>
                {outgoing && <div className="spacer" />}
              </div>
            )
          })}
        </div>

        <div className="composer">
          <input
            placeholder="Type a message…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="send" onClick={() => setText('')}>Send</button>
        </div>
      </main>
    </div>
  )
}

export default App
