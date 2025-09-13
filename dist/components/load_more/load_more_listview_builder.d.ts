import { ReactNode } from "react";
import { ItemBuilder } from "react_oop";
export interface LoadMoreListViewBuilder<T> {
    itemBuilder: ItemBuilder<T>;
    footer: (isEnd: boolean, isLoading: boolean) => ReactNode;
    refreshControl: (refreshing: boolean, onRefresh: () => void) => ReactNode;
    loadingIndicator: () => ReactNode;
    list(props: {
        data: T[];
        renderItem: (item: T, index: number) => ReactNode;
        keyExtractor: (item: T, index: number) => string;
        onEndReached: () => void;
        refreshControl: ReactNode;
        footerComponent: ReactNode;
        contentContainerStyle?: any;
    }): ReactNode;
    keyExtractor: (item: T, index: number) => string;
    endReachedThreshold: number;
    showsVerticalScrollIndicator: boolean;
    contentContainerStyle: any;
}
//# sourceMappingURL=load_more_listview_builder.d.ts.map