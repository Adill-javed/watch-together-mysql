//let stompClient = null;
//let currentRoom = null;
//let sessionId = null;
//let player = null;
//let ytReady = false;
//
//function genId() { return 's-' + Math.random().toString(36).substr(2,9); }
//sessionId = genId();
//
//function connectAndSubscribe(roomId, username, avatarEmoji) {
//  const socket = new SockJS('/ws');
//  stompClient = Stomp.over(socket);
//  stompClient.connect({}, frame => {
//    stompClient.subscribe('/topic/room.' + roomId, msg => {
//      const payload = JSON.parse(msg.body);
//      handleIncoming(payload);
//    });
//    const joinMsg = { type: 'JOIN', roomId, sender: username, content: avatarEmoji };
//    stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(joinMsg));
//  });
//}
//
//function handleIncoming(payload) {
//  if (payload.type === 'CHAT') {
//    addChatMessage(payload.sender, payload.content);
//  } else if (payload.type === 'JOIN' || payload.type === 'LEAVE') {
//    refreshUsers();
//    addSystemMessage(payload.sender + ' ' + payload.type.toLowerCase());
//  } else if (payload.type === 'TYPING') {
//    showTyping(payload.sender ? payload.sender + ' is typing...' : '');
//  } else if (payload.action) {
//    const evt = payload;
//    if (!player) return;
//    if (evt.action === 'load') {
//      loadVideoById(evt.videoId, false);
//    } else if (evt.action === 'play') {
//      player.seekTo(evt.time, true);
//      player.playVideo();
//    } else if (evt.action === 'pause') {
//      player.pauseVideo();
//    } else if (evt.action === 'seek') {
//      player.seekTo(evt.time, true);
//    }
//  }
//}
//
//function addChatMessage(sender, text) {
//  const d = document.createElement('div'); d.className = 'message';
//  d.innerHTML = '<span class="avatar">' + (sender.split('::')[1] || '') + '</span><b>' + (sender.split('::')[0]||sender) + '</b>: ' + text;
//  document.getElementById('messages').appendChild(d);
//}
//function addSystemMessage(text){ const d=document.createElement('div'); d.className='message'; d.style.opacity='0.8'; d.textContent=text; document.getElementById('messages').appendChild(d); }
//function showTyping(text){ document.getElementById('typing').textContent = text; setTimeout(()=>document.getElementById('typing').textContent='',2000); }
//
//document.getElementById('joinBtn').addEventListener('click', async ()=>{
//  const roomId = document.getElementById('roomInput').value.trim();
//  const pwd = document.getElementById('pwdInput').value || '';
//  const name = document.getElementById('nameInput').value || 'Anon';
//  const emoji = document.getElementById('emojiInput').value || '🙂';
//  if(!roomId) return alert('Enter room id');
//  const resp = await fetch('/api/rooms/join', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({roomId, password:pwd, sessionId, username:name, avatarEmoji:emoji})});
//  if (resp.status !== 200) { alert('Wrong password or cannot join'); return; }
//  currentRoom = roomId;
//  connectAndSubscribe(roomId, name + '::' + emoji, emoji);
//  refreshUsers();
//});
//
//async function refreshUsers(){
//  if(!currentRoom) return;
//  const r = await fetch('/api/rooms/' + currentRoom + '/users');
//  const users = await r.json();
//  const ul = document.getElementById('userList'); ul.innerHTML='';
//  users.forEach(u => {
//    const li = document.createElement('li'); li.textContent = (u.username || 'Anon') + ' ' + (u.avatarEmoji||'');
//    ul.appendChild(li);
//  });
//}
//
//document.getElementById('sendBtn').addEventListener('click', ()=>{
//  const t = document.getElementById('msgInput').value;
//  if(!t || !stompClient) return;
//  const parts = (document.getElementById('nameInput').value||'Anon') + '::' + (document.getElementById('emojiInput').value||'🙂');
//  const chat = { type: 'CHAT', roomId: currentRoom, sender: parts, content: t };
//  stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chat));
//  document.getElementById('msgInput').value='';
//});
//
//document.getElementById('msgInput').addEventListener('input', ()=>{
//  if(!stompClient || !currentRoom) return;
//  const parts = (document.getElementById('nameInput').value||'Anon') + '::' + (document.getElementById('emojiInput').value||'🙂');
//  const msg = { type: 'TYPING', roomId: currentRoom, sender: parts, content: '' };
//  stompClient.send('/app/chat.typing', {}, JSON.stringify(msg));
//});
//
//function spawnEmoji(e){ const n=document.createElement('div'); n.className='femoji'; n.textContent=e; document.getElementById('floatingEmojis').appendChild(n); setTimeout(()=>n.remove(),6000); }
//
//function onYouTubeIframeAPIReady() { ytReady = true; player = new YT.Player('player', {height:'360',width:'640',events:{onStateChange:onPlayerStateChange}}); }
//
//function loadVideoById(videoId, send=true){ if(!ytReady) return; player.loadVideoById(videoId); if(send){ stompClient.send('/app/video.event',{}, JSON.stringify({roomId: currentRoom, action:'load', videoId})); } }
//function onPlayerStateChange(e){ if(!stompClient) return; const state = e.data; const time = player.getCurrentTime(); if(state==1){ stompClient.send('/app/video.event',{}, JSON.stringify({roomId: currentRoom, action:'play', time})); } else if(state==2){ stompClient.send('/app/video.event',{}, JSON.stringify({roomId: currentRoom, action:'pause', time})); } }
//
//document.getElementById('loadVideo').addEventListener('click', ()=>{
//  const url = document.getElementById('videoUrl').value.trim();
//  const videoId = url.includes('watch') ? new URL(url).searchParams.get('v') : url;
//  loadVideoById(videoId, true);
//});
//
//document.getElementById('playBtn').addEventListener('click', ()=>{ if(player) player.playVideo(); });
//document.getElementById('pauseBtn').addEventListener('click', ()=>{ if(player) player.pauseVideo(); });
//document.getElementById('seekBtn').addEventListener('click', ()=>{ if(player){ player.seekTo(30,true); stompClient.send('/app/video.event',{}, JSON.stringify({roomId: currentRoom, action:'seek', time:30})); } });
//
//const quotes = ["Watch with friends; feel less alone.", "Sync. Chat. Laugh.", "Good shows are better together."];
//let qi=0; setInterval(()=>{ document.getElementById('quote').textContent = quotes[qi++ % quotes.length]; }, 3500);
//setInterval(()=>{ spawnEmoji(['😀','🎉','🔥','💖'][Math.floor(Math.random()*4)]) }, 1200);



// === WATCH TOGETHER FRONTEND SCRIPT (Render Deployment Ready) ===
let stompClient = null;
let currentRoom = null;
let sessionId = null;
let player = null;
let ytReady = false;

function genId() { return 's-' + Math.random().toString(36).substr(2,9); }
sessionId = genId();

// ✅ Change this to your actual Render backend URL (no trailing slash)
const BACKEND_URL = "https://watch-together-mysql-2.onrender.com/";

function connectAndSubscribe(roomId, username, avatarEmoji) {
  // ✅ Full backend WebSocket endpoint
  const socket = new SockJS(`${BACKEND_URL}/ws`);
  stompClient = Stomp.over(socket);
  stompClient.connect({}, frame => {
    stompClient.subscribe(`/topic/room.${roomId}`, msg => {
      const payload = JSON.parse(msg.body);
      handleIncoming(payload);
    });
    const joinMsg = { type: 'JOIN', roomId, sender: username, content: avatarEmoji };
    stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(joinMsg));
  });
}

function handleIncoming(payload) {
  if (payload.type === 'CHAT') {
    addChatMessage(payload.sender, payload.content);
  } else if (payload.type === 'JOIN' || payload.type === 'LEAVE') {
    refreshUsers();
    addSystemMessage(payload.sender + ' ' + payload.type.toLowerCase());
  } else if (payload.type === 'TYPING') {
    showTyping(payload.sender ? payload.sender + ' is typing...' : '');
  } else if (payload.action) {
    const evt = payload;
    if (!player) return;
    if (evt.action === 'load') {
      loadVideoById(evt.videoId, false);
    } else if (evt.action === 'play') {
      player.seekTo(evt.time, true);
      player.playVideo();
    } else if (evt.action === 'pause') {
      player.pauseVideo();
    } else if (evt.action === 'seek') {
      player.seekTo(evt.time, true);
    }
  }
}

function addChatMessage(sender, text) {
  const d = document.createElement('div');
  d.className = 'message';
  d.innerHTML = `<span class="avatar">${sender.split('::')[1] || ''}</span><b>${sender.split('::')[0]||sender}</b>: ${text}`;
  document.getElementById('messages').appendChild(d);
}

function addSystemMessage(text) {
  const d = document.createElement('div');
  d.className = 'message';
  d.style.opacity = '0.8';
  d.textContent = text;
  document.getElementById('messages').appendChild(d);
}

function showTyping(text) {
  document.getElementById('typing').textContent = text;
  setTimeout(() => document.getElementById('typing').textContent = '', 2000);
}

document.getElementById('joinBtn').addEventListener('click', async () => {
  const roomId = document.getElementById('roomInput').value.trim();
  const pwd = document.getElementById('pwdInput').value || '';
  const name = document.getElementById('nameInput').value || 'Anon';
  const emoji = document.getElementById('emojiInput').value || '🙂';
  if (!roomId) return alert('Enter room id');

  // ✅ Full backend API URL for joining a room
  const resp = await fetch(`${BACKEND_URL}/api/rooms/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomId, password: pwd, sessionId, username: name, avatarEmoji: emoji })
  });

  if (resp.status !== 200) {
    alert('Wrong password or cannot join');
    return;
  }

  currentRoom = roomId;
  connectAndSubscribe(roomId, name + '::' + emoji, emoji);
  refreshUsers();
});

async function refreshUsers() {
  if (!currentRoom) return;
  const r = await fetch(`${BACKEND_URL}/api/rooms/${currentRoom}/users`);
  const users = await r.json();
  const ul = document.getElementById('userList');
  ul.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = `${u.username || 'Anon'} ${u.avatarEmoji || ''}`;
    ul.appendChild(li);
  });
}

document.getElementById('sendBtn').addEventListener('click', () => {
  const t = document.getElementById('msgInput').value;
  if (!t || !stompClient) return;
  const parts = (document.getElementById('nameInput').value || 'Anon') + '::' + (document.getElementById('emojiInput').value || '🙂');
  const chat = { type: 'CHAT', roomId: currentRoom, sender: parts, content: t };
  stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chat));
  document.getElementById('msgInput').value = '';
});

document.getElementById('msgInput').addEventListener('input', () => {
  if (!stompClient || !currentRoom) return;
  const parts = (document.getElementById('nameInput').value || 'Anon') + '::' + (document.getElementById('emojiInput').value || '🙂');
  const msg = { type: 'TYPING', roomId: currentRoom, sender: parts, content: '' };
  stompClient.send('/app/chat.typing', {}, JSON.stringify(msg));
});

function spawnEmoji(e) {
  const n = document.createElement('div');
  n.className = 'femoji';
  n.textContent = e;
  document.getElementById('floatingEmojis').appendChild(n);
  setTimeout(() => n.remove(), 6000);
}

function onYouTubeIframeAPIReady() {
  ytReady = true;
  player = new YT.Player('player', { height: '360', width: '640', events: { onStateChange: onPlayerStateChange } });
}

function loadVideoById(videoId, send = true) {
  if (!ytReady) return;
  player.loadVideoById(videoId);
  if (send) {
    stompClient.send('/app/video.event', {}, JSON.stringify({ roomId: currentRoom, action: 'load', videoId }));
  }
}

function onPlayerStateChange(e) {
  if (!stompClient) return;
  const state = e.data;
  const time = player.getCurrentTime();
  if (state == 1) {
    stompClient.send('/app/video.event', {}, JSON.stringify({ roomId: currentRoom, action: 'play', time }));
  } else if (state == 2) {
    stompClient.send('/app/video.event', {}, JSON.stringify({ roomId: currentRoom, action: 'pause', time }));
  }
}

document.getElementById('loadVideo').addEventListener('click', () => {
  const url = document.getElementById('videoUrl').value.trim();
  const videoId = url.includes('watch') ? new URL(url).searchParams.get('v') : url;
  loadVideoById(videoId, true);
});

document.getElementById('playBtn').addEventListener('click', () => { if (player) player.playVideo(); });
document.getElementById('pauseBtn').addEventListener('click', () => { if (player) player.pauseVideo(); });
document.getElementById('seekBtn').addEventListener('click', () => {
  if (player) {
    player.seekTo(30, true);
    stompClient.send('/app/video.event', {}, JSON.stringify({ roomId: currentRoom, action: 'seek', time: 30 }));
  }
});

const quotes = ["Watch with friends; feel less alone.", "Sync. Chat. Laugh.", "Good shows are better together."];
let qi = 0;
setInterval(() => {
  document.getElementById('quote').textContent = quotes[qi++ % quotes.length];
}, 3500);
setInterval(() => {
  spawnEmoji(['😀','🎉','🔥','💖'][Math.floor(Math.random() * 4)]);
}, 1200);
