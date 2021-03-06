package com.railwayticket.dao_api;

import com.railwayticket.dao_api.sql_annotation.SqlQueryImpl;

import java.util.List;

public interface BaseDaoApi<T> {
    boolean save(T t);
    boolean update(T t);
    boolean delete(T t);
    T getOneById(Long id);
    List<T> FindAll();
}
