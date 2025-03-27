package com.sims.service;

import com.sims.dto.LoginRequest;
import com.sims.dto.RegisterRequest;
import com.sims.dto.Response;
import com.sims.dto.UserDTO;
import com.sims.models.User;

public interface UserService {
    Response registerUser(RegisterRequest registerRequest);

    Response loginUser(LoginRequest loginRequest);

    Response getAllUsers();

    User getCurrentLoggedInUser();

    Response getUserById(Long id);

    Response updateUser(Long id, UserDTO userDTO);

    Response deleteUser(Long id);

    Response getUserTransactions(Long id);
}
