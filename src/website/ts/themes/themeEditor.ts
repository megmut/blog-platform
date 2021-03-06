namespace Website {
    export class ThemeEditor {

        private _editor;
        private _id: string;
        private _fileID: string;

        constructor() {
            this._id = Utils.getParameterByName('theme_id');

            this._editor = new window['Quill']('#editor', {
                modules: {
                    toolbar: true
                },
                theme: 'snow'
            });

            this.addEventListeners();
        }

        private addEventListeners() {
            $('#btn-preview').click((e) => this.preview(e));
            $('#btn-save').click((e) => this.save(e));
            $('#btn-delete').click((e) => this.delete(e));
            $('.file-item').click((e) => this.getFileContents(e));

            $(window).bind('keydown', (event) => {
                if (event.ctrlKey || event.metaKey) {
                    switch (String.fromCharCode(event.which).toLowerCase()) {
                        case 's':
                            this.save(null)
                            event.preventDefault();
                            break;
                        case 'f':
                            event.preventDefault();
                            alert('ctrl-f');
                            break;
                    }
                }
            });
        }

        private getFileContents(e) {
            let element = e.target;
            let id = $(element).data('id');
            Network.get('/api/theme/load-file?file_id=' + id, (data) => {
                this._editor.setText(data.file);
                this._fileID = data.id;
            }, (error) => {
                Animations.showAlert(error.responseText, 'bg-danger');
            });
        }

        private save(e) {
            Network.put(`/api/theme/save?file_id=${this._fileID}`, {
                title: $('#post-title').val(),
                description: $('#post-description').val(),
                content: this._editor.getText(),
                fileID: this._fileID
            }, (response) => {
                Animations.showAlert(response, 'bg-success');
            }, (error) => {
                Animations.showAlert(error.responseText, 'bg-danger');
            })
        }

        private delete(e) {
            Network.delete(`/api/theme/delete-file?file_id=${this._fileID}&theme_id=${this._id}`, {}, (response) => {
                this.updateFileTree(response.tree);
                Animations.showAlert(response.message, 'bg-success');
            }, (error) => {
                Animations.showAlert(error.responseText, 'bg-danger');
            })
        }

        private updateFileTree(html) {
            $('#baseLayout').html(html.layouts);
            $('#baseTemplate').html(html.templates);
            $('#basePartials').html(html.partials);
            $('#baseSass').html(html.sass);
            $('.file-item').click((e) => this.getFileContents(e));
        }

        private preview(e) {
            Network.get(`/api/theme/preview?theme_id=${this._id}`, (response) => {
                let win = window.open(`/?preview_id=${response}`, '_blank');
                win.focus();
            });
        }
    }
}