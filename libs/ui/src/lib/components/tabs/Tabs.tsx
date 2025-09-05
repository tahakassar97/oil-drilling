'use client';

import {
  FC,
  Children,
  ReactNode,
  isValidElement,
  cloneElement,
  useState,
  useCallback,
} from 'react';

import { cn } from '../../utils';
import { useParams } from '../../hooks';

interface TabProps {
  title: string;
  children: ReactNode | null;
  index?: number;
  isActive?: boolean;
  isActiveClassName?: string;
  className?: string;
  disabled?: boolean;
  handleTab?: (index: number, tabName: string) => void;
  onCustomClick?: () => void;
}

const Tab: FC<TabProps> = ({
  title,
  index,
  isActive = true,
  className = '',
  isActiveClassName,
  disabled = false,
  handleTab,
  onCustomClick,
}) => {
  console.log(isActiveClassName);
  return (
    <li
      className={cn(
        `py-2 text-center text-sm transition-all ease-in-out text-nowrap px-4 duration-300 cursor-pointer ${className}`,
        {
          [isActiveClassName || '']: isActive,
          'cursor-not-allowed opacity-50': disabled,
        }
      )}
      onClick={() => {
        if (disabled) return;

        handleTab?.(index || 1, title);
        onCustomClick?.();
      }}
    >
      {title}
    </li>
  );
};

interface TabsProps {
  children: ReactNode;
  className?: string;
  syncWithUrl?: boolean;
  isActiveClassName?: string;
  activeTab?: number;
  onTabChange?: (currentTabIndex: number) => void;
}

const Tabs: FC<TabsProps> = ({
  children,
  className = '',
  syncWithUrl = true,
  isActiveClassName = 'border-b border-primary-500 !text-primary-500',
  activeTab = 1,
  onTabChange,
}) => {
  const { getParam, changeParams } = useParams();

  const [tabIndex, setTabIndex] = useState(activeTab);

  const getTabName = useCallback((tabName: string) => {
    return tabName?.split(' ').join('_');
  }, []);

  const getIsActive = (index: number, tabName: string) => {
    if (syncWithUrl) {
      if (getParam('tab')) return getParam('tab') === tabName;

      return index === 0;
    }

    return index + 1 === tabIndex;
  };

  const handleTab = useCallback(
    (index: number, tabName: string) => {
      if (syncWithUrl) {
        const name = getTabName(tabName);

        changeParams('tab', name);
      }

      onTabChange?.(index);

      if (!syncWithUrl) {
        setTabIndex(index);
      }
    },

    [syncWithUrl]
  );

  if (children === null) return null;

  return (
    <div className="flex flex-col justify-between w-full">
      <ul
        className={`flex gap-5 flex-wrap md:flex-nowrap md:justify-start justify-center mb-8 ${className}`}
      >
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return null;

          return cloneElement(child as React.ReactElement<TabProps>, {
            isActive: getIsActive(
              index,
              getTabName((child.props as TabProps).title as string)
            ),
            index: index + 1,
            handleTab,
            isActiveClassName,
          });
        })}
      </ul>

      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return null;

        const { children, title } = child.props as {
          children: ReactNode;
          title: string;
        } & TabProps;

        return (
          isValidElement(children) &&
          getIsActive(index, getTabName(title as string)) &&
          cloneElement(children)
        );
      })}
    </div>
  );
};

export { Tabs, Tab };
