import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getUserProfileRequest } from '@/API/auth';

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'sepah_2';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserCompleteProfile, setIsUserCompleteProfile] = useState(false);
  const [userProfileData, setUserProfileData] = useState(null);
  const [selectedCourseSessionProgram, setSelectedCourseSessionProgram] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Load authentication state from localStorage
    const storedAuth = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-isAuthenticated`) : false;
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-user`) : false;
    // Load profile completion state and profile data from localStorage
    const storedProfileCompletion = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-isUserCompleteProfile`) : false;
    const storedProfileData = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-userProfileData`) : false;

    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    // Set profile completion state and profile data if available
    if (storedProfileCompletion === 'true' && storedProfileData) {
      setIsUserCompleteProfile(true);
      setUserProfileData(JSON.parse(storedProfileData));
    } else {
      setIsUserCompleteProfile(false);
      setUserProfileData(null);
    }
    setIsLoading(false);
  }, []);

  // Function to log in and store data
  const login = (/** @type {{ access: { token: string; }; refresh: { token: string; }; }} */ tokens, /** @type {import("react").SetStateAction<null>} */ userDoc) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${PROJECT_NAME}-access`, tokens.access.token);
      localStorage.setItem(`${PROJECT_NAME}-refresh`, tokens.refresh.token);
      localStorage.setItem(`${PROJECT_NAME}-lastLogin`, Date.now().toString());
      localStorage.setItem(`${PROJECT_NAME}-isAuthenticated`, 'true');
      localStorage.setItem(`${PROJECT_NAME}-user`, JSON.stringify(userDoc));
    }

    setIsAuthenticated(true);
    setUser(userDoc);
  };

  // @ts-ignore
  const updateUser = (userDoc) => {
    if (!userDoc || !userDoc?.id) {
      return false;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${PROJECT_NAME}-user`, JSON.stringify(userDoc));
    }
    setUser(userDoc);
  };

  // New method to update user profile data
  const updateUserProfile = (profileData) => {
    if (!profileData) {
      return false;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(`${PROJECT_NAME}-userProfileData`, JSON.stringify(profileData));
      localStorage.setItem(`${PROJECT_NAME}-isUserCompleteProfile`, 'true');
    }

    setUserProfileData(profileData);
    setIsUserCompleteProfile(true);

    return true;
  };

  // New method to updateselectedCourseSession data
  // @ts-ignore
  const updateSelectedCourseSessionProgram = (_selectedCourseSessionProgram) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${PROJECT_NAME}-selectedCourseSessionProgram`, JSON.stringify(_selectedCourseSessionProgram));
    }

    setSelectedCourseSessionProgram(_selectedCourseSessionProgram);
  };

  // Function to log out and clear data
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`${PROJECT_NAME}-access`);
      localStorage.removeItem(`${PROJECT_NAME}-refresh`);
      localStorage.removeItem(`${PROJECT_NAME}-lastLogin`);
      localStorage.removeItem(`${PROJECT_NAME}-isAuthenticated`);
      localStorage.removeItem(`${PROJECT_NAME}-user`);
      // Also remove profile-related items
      localStorage.removeItem(`${PROJECT_NAME}-isUserCompleteProfile`);
      localStorage.removeItem(`${PROJECT_NAME}-userProfileData`);
    }

    setIsAuthenticated(false);
    setUser(null);
    // Reset profile states
    setIsUserCompleteProfile(false);
    setUserProfileData(null);
  };

  // Add the fetchUserFromServer method
  const fetchUserFromServer = async () => {
    if (!user?.id) {
      return;
    }

    // Invalidate the existing query to force a fresh request
    // @ts-ignore
    await queryClient.invalidateQueries(['profile', user.id]);

    // Fetch fresh data
    const result = await queryClient.fetchQuery({
      queryKey: ['profile', user.id],
      queryFn: () => getUserProfileRequest({ userId: user.id }),
      staleTime: 0, // Ensure we get fresh data
    });

    if (result?.profile) {
      // Update profile data
      updateUserProfile(result.profile);

      // Update user data
      if (result.profile.user) {
        updateUser(result.profile.user);
      }
    }

    return result;
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    updateUser,
    isUserCompleteProfile,
    userProfileData,
    updateUserProfile,
    selectedCourseSessionProgram,
    updateSelectedCourseSessionProgram,
    fetchUserFromServer,
    isLoading,
  };
};

export default useAuth;
