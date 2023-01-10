package codestates.main22.user.service;

import codestates.main22.exception.BusinessLogicException;
import codestates.main22.exception.ExceptionCode;
import codestates.main22.user.entity.UserEntity;
import codestates.main22.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    //CRUD 순서에 맞춰서

    //CREATE
    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    //READ - 하나 조회
    public UserEntity findUser(long userId) {
        UserEntity user = verifiedUser(userId); // user 가 있는지 검증

        return userRepository.save(user);
    }

    //READ - 전체 조회
    public Page<UserEntity> findUsers(int page, int size) {
        return userRepository.findAll(
                PageRequest.of(page, size, Sort.by("userId").descending())
        );
    }

    //UPDATE
    public UserEntity updateUser(long userId, UserEntity changedUser) {
        UserEntity user = verifiedUser(userId); // user 가 있는지 검증

        user.setUsername(changedUser.getUsername());
        user.setEmail(changedUser.getEmail());
        user.setInfo(changedUser.getInfo());
        user.setImgUrl(changedUser.getImgUrl());

        return userRepository.save(user);
    }

    //DELETE
    public void deleteUser(long userId) {
        UserEntity user = verifiedUser(userId); // user 가 있는지 검증

        userRepository.delete(user);
    }


    public UserEntity verifiedUser(long userId) { // 해당 userId를 사용하고 있는 유저가 존재하는가?
        Optional<UserEntity> user = userRepository.findById(userId);
        return user.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }
}