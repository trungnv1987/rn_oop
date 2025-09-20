import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { UIButton, Row, Expanded } from "../index";
import { Lang, UICubit } from "react_oop";
import {
  UIDialogController,
  UIDialogDisplayProps,
} from "./ui_dialog_controller";
import { fontSizes, sizes } from "../../styles";
import { defaultTheme } from "../../theme";

interface UIDialogProps {
  containerStyle?: any;
  controller: UIDialogController;
}

export function UIDialog(props: UIDialogProps) {
  const { controller, containerStyle } = props;

  return (
    <UICubit<UIDialogDisplayProps> cubit={controller.cubit}>
      {(value) => {
        if (!value) return null;
        const {
          title,
          message,
          confirmText,
          cancelText,

          isDelete,
        } = value;
        let dismissible = value.dismissible;
        if (dismissible == undefined) {
          dismissible = true;
        }
        const { onFinished } = controller;
        const visible = value != undefined;

        const confirmPressed = () => {
          controller.hide();
          onFinished?.(true);
        };

        const cancelPressed = () => {
          controller.hide();
          onFinished?.(false);
        };

        const backgroundPressed = () => {
          if (dismissible) {
            controller.hide();
            onFinished?.(undefined);
          }
        };

        return (
          <Modal
            visible={visible}
            transparent
            animationType="fade"
            onDismiss={() => {
              backgroundPressed();
            }}
            onRequestClose={backgroundPressed}
          >
            <TouchableOpacity
              onPress={backgroundPressed}
              style={styles.backdrop}
              activeOpacity={1}
            >
              <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                <View style={[styles.container, containerStyle]}>
                  {/* Title */}
                  {title && (
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>{title}</Text>
                    </View>
                  )}

                  {/* Message */}
                  {message && (
                    <View style={styles.messageContainer}>
                      <Text style={styles.message}>{message}</Text>
                    </View>
                  )}

                  {/* Action Buttons */}
                  <Row style={styles.buttonsContainer} gap={sizes.md}>
                    <Expanded>
                      <UIButton
                        textStyle={{ color: "black" }}
                        title={cancelText || Lang.localize("common.cancel")}
                        onPress={cancelPressed}
                        style={StyleSheet.flatten([
                          styles.button,
                          styles.cancelButton,
                        ])}
                      />
                    </Expanded>
                    <Expanded>
                      <UIButton
                        title={
                          confirmText ||
                          (isDelete
                            ? Lang.localize("action.delete")
                            : Lang.localize("common.confirm"))
                        }
                        onPress={confirmPressed}
                        style={StyleSheet.flatten([
                          styles.button,
                          isDelete ? styles.deleteButton : styles.confirmButton,
                        ])}
                      />
                    </Expanded>
                  </Row>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        );
      }}
    </UICubit>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: sizes.lg,
  },
  container: {
    backgroundColor: defaultTheme.colors.surface,
    borderRadius: sizes.lg,
    padding: sizes.lg,
    minWidth: 280,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  titleContainer: {
    marginBottom: sizes.md,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: defaultTheme.colors.onSurface,
    textAlign: "center",
  },
  messageContainer: {
    marginBottom: sizes.lg,
  },
  message: {
    fontSize: fontSizes.md,
    color: defaultTheme.colors.onSurface,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonsContainer: {
    marginTop: sizes.sm,
  },
  button: {
    minHeight: 44,
  },
  cancelButton: {
    backgroundColor: "#F3F4F6", // Light grey background
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelButtonText: {
    color: defaultTheme.colors.onSurface,
    fontSize: fontSizes.md,
    fontWeight: "500",
  },
  confirmButton: {
    backgroundColor: defaultTheme.colors.primary,
  },
  deleteButton: {
    backgroundColor: "#DC2626", // Red color for delete actions
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: fontSizes.md,
    fontWeight: "500",
  },
});
