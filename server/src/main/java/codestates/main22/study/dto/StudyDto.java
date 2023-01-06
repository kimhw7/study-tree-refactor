package codestates.main22.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

public class StudyDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String teamName;
        private String summary;
        private List<String> dayOfWeek;
        private int want;
        private LocalDate startDate;
        private boolean procedure;
        private boolean openClose;
        private String content;
        private String image;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private Long studyId;
        private String teamName;
        private String summary;
        private List<String> dayOfWeek;
        private int want;
        private LocalDate startDate;
        private boolean procedure;
        private boolean openClose;
        private String content;
        private List<String> notice;
        private String image;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long studyId;
        private String teamName;
        private String summary;
        private List<String> dayOfWeek;
        private int want;
        private LocalDate startDate;
        private boolean procedure;
        private boolean openClose;
        private String content;
        private List<String> notice;
        private String image;
    }
}