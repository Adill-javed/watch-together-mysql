package com.example.watchtogether.controller;

import com.example.watchtogether.model.ChatMessage;
import com.example.watchtogether.model.VideoEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketEventController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chat) {
        messagingTemplate.convertAndSend("/topic/room." + chat.getRoomId(), chat);
    }

    @MessageMapping("/chat.typing")
    public void typing(@Payload ChatMessage chat) {
        messagingTemplate.convertAndSend("/topic/room." + chat.getRoomId(), chat);
    }

    @MessageMapping("/video.event")
    public void videoEvent(@Payload VideoEvent evt) {
        messagingTemplate.convertAndSend("/topic/room." + evt.getRoomId(), evt);
    }
}
