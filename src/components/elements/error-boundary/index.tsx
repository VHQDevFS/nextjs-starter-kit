import { Component, ErrorInfo, ReactNode } from 'react';

import { APP_ROUTES, logger } from '@utils';
import { Button, Result } from 'antd';

import { MODE } from '@/configs';

export interface Props {
  children: ReactNode;
}

export interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.debug('error', JSON.stringify(error));
    logger.debug('errorInfo', JSON.stringify(errorInfo));
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="">
          {MODE === 'development' ? (
            <div>
              <h1>{JSON.stringify(error?.message)}</h1>
              <p>{JSON.stringify(error?.stack)}</p>
            </div>
          ) : (
            <a href="#/">Back to home page</a>
          )}
        </div>
      );
    }

    return children;
  }
}
