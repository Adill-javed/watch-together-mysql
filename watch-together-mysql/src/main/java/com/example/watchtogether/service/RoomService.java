package com.example.watchtogether.service;

import com.example.watchtogether.model.RoomEntity;
import com.example.watchtogether.model.UserEntity;
import com.example.watchtogether.model.UserInfo;
import com.example.watchtogether.repository.RoomRepository;
import com.example.watchtogether.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public boolean tryCreateOrJoin(String roomId, String password, String sessionId, UserInfo userInfo) {
        RoomEntity room = roomRepository.findById(roomId).orElse(null);
        if (room == null) {
            RoomEntity r = new RoomEntity();
            r.setRoomId(roomId);
            r.setPassword(password == null ? "" : password);
            roomRepository.save(r);
            UserEntity ue = new UserEntity();
            ue.setSessionId(sessionId);
            ue.setUsername(userInfo.getUsername());
            ue.setAvatarEmoji(userInfo.getAvatarEmoji());
            ue.setRoom(r);
            userRepository.save(ue);
            return true;
        }
        String setPwd = room.getPassword() == null ? "" : room.getPassword();
        if (!setPwd.equals(password == null ? "" : password)) return false;
        UserEntity ue = new UserEntity();
        ue.setSessionId(sessionId);
        ue.setUsername(userInfo.getUsername());
        ue.setAvatarEmoji(userInfo.getAvatarEmoji());
        ue.setRoom(room);
        userRepository.save(ue);
        return true;
    }

    @Transactional
    public void leaveRoom(String roomId, String sessionId) {
        // remove user
        List<UserEntity> users = userRepository.findByRoomRoomId(roomId);
        users.stream().filter(u -> sessionId.equals(u.getSessionId())).findFirst().ifPresent(u -> userRepository.deleteById(u.getId()));
        // if no users left, delete room
        List<UserEntity> remaining = userRepository.findByRoomRoomId(roomId);
        if (remaining.isEmpty()) {
            roomRepository.deleteById(roomId);
        }
    }

    public List<UserInfo> getUsers(String roomId) {
        List<UserEntity> users = userRepository.findByRoomRoomId(roomId);
        return users.stream().map(u -> new UserInfo(u.getSessionId(), u.getUsername(), u.getAvatarEmoji())).collect(Collectors.toList());
    }
}
