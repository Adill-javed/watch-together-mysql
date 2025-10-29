package com.example.watchtogether.model;

public class VideoEvent {
    private String roomId;
    private String action;
    private String videoId;
    private double time;

    public String getRoomId() { return roomId; }
    public void setRoomId(String roomId) { this.roomId = roomId; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getVideoId() { return videoId; }
    public void setVideoId(String videoId) { this.videoId = videoId; }
    public double getTime() { return time; }
    public void setTime(double time) { this.time = time; }
}
