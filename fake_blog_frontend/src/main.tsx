import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    HomePage,
    LoginPage,
    RegisterPage,
    PostDetailPage,
    ProfilePostsPage,
    ProfileCommentsPage,
    ProfileLikedPostsPage,
    ProfileFollowedPage,
    UserDetailCommentsPage,
    UserDetailFollowedPage,
    UserDetailLikedPosts,
    AddPostPage,
} from './pages';
import { PrivateRoute } from './components';
import { AuthProvider, ProfileProvider, UserProvider } from './context';
import UserDetailPostsPage from './pages/UserDetailPosts/UserDetailPostsPage';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <ProfileProvider>
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            //Public routes
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route
                                path="/post_detail/:postId"
                                element={<PostDetailPage />}
                            />
                            <Route
                                path="/user_detail/:userId/posts"
                                element={<UserDetailPostsPage />}
                            />
                            <Route
                                path="/user_detail/:userId/comments"
                                element={<UserDetailCommentsPage />}
                            />
                            <Route
                                path="/user_detail/:userId/liked_posts"
                                element={<UserDetailLikedPosts />}
                            />
                            <Route
                                path="/user_detail/:userId/followed"
                                element={<UserDetailFollowedPage />}
                            />
                            //Protected routes
                            <Route
                                path="/profile/posts"
                                element={
                                    <PrivateRoute>
                                        <ProfilePostsPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile/comments"
                                element={
                                    <PrivateRoute>
                                        <ProfileCommentsPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile/liked_posts"
                                element={
                                    <PrivateRoute>
                                        <ProfileLikedPostsPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile/followed"
                                element={
                                    <PrivateRoute>
                                        <ProfileFollowedPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile/add_post"
                                element={
                                    <PrivateRoute>
                                        <AddPostPage />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            </ProfileProvider>
        </AuthProvider>
    </React.StrictMode>
);
