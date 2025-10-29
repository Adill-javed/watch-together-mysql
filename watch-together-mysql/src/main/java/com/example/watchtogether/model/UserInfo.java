package com.example.watchtogether.model;

public class UserInfo {
    private String sessionId;
    private String username;
    private String avatarEmoji;

    public UserInfo() {}
    public UserInfo(String sessionId, String username, String avatarEmoji) {
        this.sessionId = sessionId;
        this.username = username;
        this.avatarEmoji = avatarEmoji;
    }
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getAvatarEmoji() { return avatarEmoji; }
    public void setAvatarEmoji(String avatarEmoji) { this.avatarEmoji = avatarEmoji; }
}
