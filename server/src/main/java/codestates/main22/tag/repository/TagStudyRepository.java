package codestates.main22.tag.repository;

import codestates.main22.study.entity.Study;
import codestates.main22.tag.entity.Tag;
import codestates.main22.tag.entity.TagStudy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagStudyRepository extends JpaRepository<TagStudy, Long> {
    List<TagStudy> findByStudyAndTag(Study study, Tag tag);
}