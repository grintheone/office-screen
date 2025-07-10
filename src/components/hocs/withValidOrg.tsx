import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    availableThemes,
    selectTheme,
    setTheme,
    type Theme,
} from "@/features/settings/settingsSlice";

export const withValidOrg = (WrappedComponent: React.ComponentType) => {
    return function WithValidOrg() {
        const currentTheme = useAppSelector(selectTheme)
        const dispatch = useAppDispatch();
        const { org } = useParams();
        const navigate = useNavigate();

        useEffect(() => {
            if (org && !availableThemes.includes(org as Theme)) {
                navigate("/");
                return;
            }

            if (currentTheme !== org) {
                dispatch(setTheme(org as Theme));
            }
        }, [org, navigate, dispatch, currentTheme]);

        return <WrappedComponent />;
    };
};
