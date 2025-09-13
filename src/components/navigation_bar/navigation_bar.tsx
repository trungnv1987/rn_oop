import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { ChevronLeft, Search } from "lucide-react-native";
import { tabBarStyles } from "../../styles/_tabbar";
import { GenericCallback, useDebounce } from "react_oop";
import { Lang, LoadMoreController } from "react_oop";
import { UIButton, UIInput, UIIconButton } from "../components";

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

export function NavigationBar({
  title,
  leftButton,
  rightButton,
  showLargeTitle = false,
  searchBar,
  couldSearch = false,
  onSearching,
  loadMoreController,
}: NavigationBarProps) {
  const [isSearching, setIsSearching] = useState(false);

  const handlePressSearch = () => {
    setIsSearching(true);
    loadMoreController?.setSearching(true);
  };

  const handleCancelSearch = () => {
    setIsSearching(false);
    loadMoreController?.setSearching(false);
  };

  const debouncedSearch = useDebounce((query: string) => {
    console.log("debouncedSearch", query);
    if (onSearching) {
      onSearching(query);
    } else {
      loadMoreController?.search(query);
    }
  }, 300);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={tabBarStyles.container}>
        <View style={tabBarStyles.header}>
          {leftButton &&
            (leftButton.showBackButton ? (
              <UIIconButton
                onPress={leftButton.onPress}
                variant="ghost"
                size="medium"
                style={tabBarStyles.leftButton}
              >
                <ChevronLeft size={20} color="#007AFF" />
              </UIIconButton>
            ) : (
              <UIButton
                title={leftButton.text || ""}
                onPress={leftButton.onPress}
                variant="ghost"
                size="medium"
                style={tabBarStyles.leftButton}
              />
            ))}

          {title && !isSearching && (
            <Text style={tabBarStyles.title}>{title}</Text>
          )}

          {couldSearch ? (
            isSearching ? (
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <View style={{ flex: 1 }}>
                  {searchBar ?? (
                    <UIInput
                      defaultValue={loadMoreController?.searchKeyword}
                      clearButtonMode="always"
                      placeholder={Lang.localize("common.search")}
                      autoFocus={true}
                      returnKeyType="done"
                      onChangeText={(txt) => {
                        debouncedSearch(txt);
                      }}
                      inputStyle={
                        {
                          // backgroundColor: defaultTheme.colors.surfaceVariant,
                        }
                      }
                    />
                  )}
                </View>
                <UIButton
                  title={Lang.localize("common.cancel")}
                  onPress={handleCancelSearch}
                  variant="ghost"
                  size="medium"
                  style={{
                    paddingHorizontal: 8,
                    height: 44,
                    marginLeft: 8,
                  }}
                />
              </View>
            ) : (
              <UIIconButton
                onPress={handlePressSearch}
                variant="ghost"
                size="medium"
                style={tabBarStyles.rightButton}
              >
                <Search size={20} color="#007AFF" />
              </UIIconButton>
            )
          ) : (
            rightButton && (
              <UIButton
                title={rightButton.text}
                onPress={rightButton.onPress}
                variant="ghost"
                size="medium"
                style={tabBarStyles.rightButton}
              />
            )
          )}
        </View>

        {!isSearching && showLargeTitle && title && (
          <Text style={tabBarStyles.largeTitle}>{title}</Text>
        )}
      </View>
    </>
  );
}
