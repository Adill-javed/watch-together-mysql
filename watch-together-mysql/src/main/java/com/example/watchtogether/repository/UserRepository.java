package com.example.watchtogether.repository;

import com.example.watchtogether.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    List<UserEntity> findByRoomRoomId(String roomId);
    void deleteBySessionId(String sessionId);
}
