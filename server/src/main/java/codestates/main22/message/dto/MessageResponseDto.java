package codestates.main22.message.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

public class MessageResponseDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        public long messageId;
        public String content;
        public LocalDateTime dateTime;
        public long userId;
    }
}
