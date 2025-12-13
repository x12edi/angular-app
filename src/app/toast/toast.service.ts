import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastService {

  message = signal('');
  type = signal<ToastType>('info');
  visible = signal(false);

  show(msg: string, type: ToastType = 'info', duration = 3000) {
    this.message.set(msg);
    this.type.set(type);
    this.visible.set(true);

    setTimeout(() => {
      this.visible.set(false);
    }, duration);
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error');
  }

  info(msg: string) {
    this.show(msg, 'info');
  }
}
