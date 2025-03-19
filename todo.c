#include <gtk/gtk.h>
#include <webkit2/webkit2.h>

static void activate(GtkApplication *app, gpointer user_data) {
    // Get the user's home directory
    const char *home = getenv("HOME");
    if (home == NULL) {
        g_printerr("Error: HOME environment variable is not set.\n");
        return;
    }

    // Construct the full file path
    char filepath[1024];
    snprintf(filepath, sizeof(filepath), "file:///home/slate/Apps/Todo/index.html");


    GtkWidget *window = gtk_application_window_new(app);
    gtk_window_set_title(GTK_WINDOW(window), "My Native Todo JS App");
    gtk_window_set_default_size(GTK_WINDOW(window), 800, 600);

    GtkWidget *webview = webkit_web_view_new();
    webkit_web_view_load_uri(WEBKIT_WEB_VIEW(webview), filepath);

    gtk_container_add(GTK_CONTAINER(window), webview);
    gtk_widget_show_all(window);
}

int main(int argc, char **argv) {
    GtkApplication *app = gtk_application_new("com.example.Todo", G_APPLICATION_FLAGS_NONE);
    g_signal_connect(app, "activate", G_CALLBACK(activate), NULL);
    int status = g_application_run(G_APPLICATION(app), argc, argv);
    g_object_unref(app);
    return status;
}

