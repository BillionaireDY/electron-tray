/**
 * dialog 5개의 api존재 1빼고 4개는 자쥬쓰인다.
 * api 참고
 * browserWindow를 파라미터러 줄 수 있다. 브라우저윈도우와 dialog간의 종속성.
 */ 
const {app, BrowserWindow, Tray, Menu, dialog}  = require('electron');
const path = require('path');

let win = null;

const template = [
    {
        label: 'Open',
        click: () => {
            console.log('clicked');
            if (win === null) {
                // win 이 종료되면 에러발생 -> 처리 윈도우 종료 라이프사이클에서 win = null로 
                win = new BrowserWindow();
                win.loadURL('https://www.naver.com');
                win.on('closed', () => {
                    win = null;
                    // 뷰의 데이터가 날아간다..
                    // 저장할 것은 저장하도록..
                });
            } else {
                win.focus();
            }
        }
    }, {
        type: 'separator'
    }, {
        label: 'Quit',
        click: () => {
            app.quit();
        }
    }, {
        type: 'checkbox',
        label: 'check dy',
        checked: true,
        click: (event) => {

        }
    } , {
        label: 'parent',
        submenu: [
            {
                label: 'child1'
            }, {
                label: 'child2'
            }
        ]
    }
];

// 메뉴창.. 비게하면 ctrl v 가 안먹는다. 왜??
// OS가 기본적으로 제공하는 메뉴가 저런 단축키들을 애초에 바인딩해놓기 때문이다.
const template2 = [
    {
        label: 'label', 
        submenu: [
            {
                label: 'Open',
                click: () => {
                    console.log('clicked');
                    if (win === null) {
                        win = new BrowserWindow();
                        win.loadURL('https://www.naver.com');
                        win.on('closed', () => {
                            win = null;
                        });
                    } else {
                        win.focus();
                    }
                }
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ]
    }, {
        label: 'Edit',
        submenu: [
            {
                role: 'paste'
            }, {
                role: 'toggledevtools'
            }
        ]
    }, {
        label: 'dialogue',
        submenu: [
            {
                label: 'open file',
                click: () => {
                    // 브라우저윈도우 떠있는 여부.
                    if (win !== null) {
                        dialog.showOpenDialog(win, {
                            // option 설정부분
                        }, path => {
                            
                        });
                    } else {
                        dialog.showOpenDialog({
                            // option 설정부분
                            filters: [
                                {
                                    name: 'what is name property?',
                                    extensions: ['json']
                                }
                            ], properties: [
                                'multiSelections'
                            ]
                        }, path => {
                            console.log(path);
                        });
                    }
                    
                }
            }, {
                label: 'save file',
                click: () => {
                    dialog.showSaveDialog({}, path => {

                    });
                }
            } ,{
                label: 'message box',
                click: () => {
                    if (win === null) {
                        dialog.showMessageBox(win, {
                            message: 'hello!',
                            detail: 'hello world?'
                        });     
                    } else {
                        dialog.showMessageBox({
                            message: 'hello!',
                            detail: 'hello world?',
                            buttons: [
                                'nope',
                                'yes'
                            ]
                        }, id => {
                            console.log(id);
                        });     
                    }
                }
            }
        ]
    }
];

app.on('ready', () => {
    
    // check platform Win/Mac/Linux?
    console.log(process.versions);
    console.log(process.platform);
    console.log(process.type);

    const tray = new Tray(path.join(__dirname, 'tray.png'));
    // tray 버튼 메뉴
    tray.setContextMenu(Menu.buildFromTemplate(template));

    tray.on('click', () => {
        console.log('tray click');
    });

    // app drop-down 메뉴
    Menu.setApplicationMenu(Menu.buildFromTemplate(template2));

});

// tray 에서 생성한 window 가 꺼져도 트레이에는 남아아있다.
app.on('window-all-closed', () => {

});