import { ReactNode } from "react";
import { ItemBuilder, LoadMoreController } from "react_oop";
interface LoadMoreListViewProps<T> {
    controller: LoadMoreController<T>;
    itemBuilder: ItemBuilder<T>;
    keyExtractor?: (item: T) => any;
    endReachedThreshold?: number;
    showsScrollIndicator?: boolean;
    contentContainerStyle?: any;
    separator?: ReactNode;
    couldRefresh?: boolean;
}
export declare function LoadMoreListView<T>({ controller, itemBuilder, keyExtractor, showsScrollIndicator, contentContainerStyle, separator, couldRefresh, }: LoadMoreListViewProps<T>): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=load_more_listview.d.ts.map