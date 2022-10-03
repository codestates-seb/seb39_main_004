package run.ward.mmz.service.account.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.subscribe.Subscribe;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.account.AccountRepository;
import run.ward.mmz.repository.account.SubscribeRepository;
import run.ward.mmz.service.account.SubscribeService;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService {

    private final SubscribeRepository subscribeRepository;
    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public void follow(Long toUserId, Long forUserId) {

        if (Objects.equals(toUserId, forUserId))
            throw new CustomException(ExceptionCode.SUBSCRIBE_METHOD_NOT_ALLOWED);

        if (!accountRepository.existsById(forUserId))
            throw new CustomException(ExceptionCode.SUBSCRIBE_FOLLOW_USER_NOT_FOUND);

        if (!accountRepository.existsById(toUserId))
            throw new CustomException(ExceptionCode.USER_NOT_FOUND);

        try {
            subscribeRepository.follow(forUserId, toUserId);
        } catch (Exception e) {
            throw new CustomException(ExceptionCode.SUBSCRIBE_FOLLOW_USER_EXISTS);
        }


    }

    @Override
    @Transactional
    public void unFollow(Long toUserId, Long forUserId) {

        if (Objects.equals(toUserId, forUserId))
            throw new CustomException(ExceptionCode.SUBSCRIBE_METHOD_NOT_ALLOWED);

        if (!accountRepository.existsById(forUserId))
            throw new CustomException(ExceptionCode.SUBSCRIBE_FOLLOW_USER_NOT_FOUND);

        if (!accountRepository.existsById(toUserId))
            throw new CustomException(ExceptionCode.USER_NOT_FOUND);

        subscribeRepository.unFollow(forUserId, toUserId);

    }

    @Override
    @Transactional(readOnly = true)
    public List<Account> findAllFollowUserByAccount(Long userId) {

        if(!accountRepository.existsById(userId)) {
            throw new CustomException(ExceptionCode.USER_NOT_FOUND);
        }

        List<Account> followerUserList = new ArrayList<>();
        List<Subscribe> subscribeList = subscribeRepository.findAllByToUserId(userId);

        for (Subscribe subscribe : subscribeList) {
            if(subscribe.getToUser().getId().equals(userId))
                followerUserList.add(subscribe.getForUser());
        }

        return followerUserList.stream()
                .sorted((user1, user2) -> (int) (user1.getId() - user2.getId()))
                .collect(Collectors.toList());

    }

    @Override
    @Transactional(readOnly = true)
    public List<Account> findAllFollowingUserByAccount(Long userId) {

        return accountRepository.findById(userId).orElseThrow(
                () -> new CustomException(ExceptionCode.USER_NOT_FOUND)
        ).getFollowerUserList()
                .stream()
                .sorted((user1, user2) -> (int) (user1.getId() - user2.getId()))
                .collect(Collectors.toList());
    }
}
