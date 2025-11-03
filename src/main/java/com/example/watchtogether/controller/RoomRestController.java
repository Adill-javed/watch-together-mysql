package com.example.watchtogether.controller;

import com.example.watchtogether.model.UserInfo;
import com.example.watchtogether.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
@CrossOrigin(origins = "https://watch-together-mysql-2.onrender.com/")
@RestController
@RequestMapping("/api/rooms")
public class RoomRestController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/join")
    public ResponseEntity<?> joinRoom(@RequestBody JoinRequest req) {
        boolean ok = roomService.tryCreateOrJoin(req.roomId, req.password, req.sessionId,
                new UserInfo(req.sessionId, req.username, req.avatarEmoji));
        if (!ok) return ResponseEntity.status(403).body("Wrong password");
        return ResponseEntity.ok("joined");
    }

    @GetMapping("/{roomId}/users")
    public Collection<?> users(@PathVariable String roomId) {
        return roomService.getUsers(roomId);
    }

    public static class JoinRequest {
        public String roomId;
        public String password;
        public String sessionId;
        public String username;
        public String avatarEmoji;
    }
}
