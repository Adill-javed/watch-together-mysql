package com.example.watchtogether.repository;

import com.example.watchtogether.model.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<RoomEntity, String> {
}
