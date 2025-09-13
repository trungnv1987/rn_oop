import React from "react";
import { GenericCallback } from "react_oop";
import { LoadMoreController } from "react_oop";
interface NavigationBarProps {
    title?: string;
    leftButton?: {
        text?: string;
        onPress: () => void;
        showBackButton?: boolean;
    };
    rightButton?: {
        text: string;
        onPress: () => void;
    };
    showLargeTitle?: boolean;
    searchBar?: React.ReactNode;
    couldSearch?: boolean;
    onSearching?: GenericCallback<string>;
    loadMoreController?: LoadMoreController<any>;
}
export declare function NavigationBar({ title, leftButton, rightButton, showLargeTitle, searchBar, couldSearch, onSearching, loadMoreController, }: NavigationBarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=navigation_bar.d.ts.map