package com.example.watchtogether.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import java.util.Set;

@Entity
public class RoomEntity {
    @Id
    private String roomId;
    private String password;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserEntity> users;

    public String getRoomId() { return roomId; }
    public void setRoomId(String roomId) { this.roomId = roomId; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Set<UserEntity> getUsers() { return users; }
    public void setUsers(Set<UserEntity> users) { this.users = users; }
}
