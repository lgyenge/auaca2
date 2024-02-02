/*!
 * Copyright © 2005-2023 Hyland Software, Inc. and its affiliates. All rights reserved.
 *
 * Alfresco Example Content Application
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail. Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * from Hyland Software. If not, see <http://www.gnu.org/licenses/>.
 */

import { RuleContext } from '@alfresco/adf-extensions';
import { Node } from '@alfresco/js-api';
import { AuSelectionState } from '@alfresco/aca-shared/store';

export interface AuRuleContext extends RuleContext {
  auItemSelection: Node;
  auSelection: AuSelectionState;
}

export function isAuTemplate(context: RuleContext): boolean {
  const { url } = context.navigation;
  // eslint-disable-next-line no-console
  // console.log('isAuTemplate context.navigation.url:' + context.navigation.url);
  return url?.startsWith('/templates') && !url?.endsWith('/templates');
}

export function isAuTemplates(context: RuleContext): boolean {
  const { url } = context.navigation;
  // eslint-disable-next-line no-console
  // console.log('isAuTemplate context.navigation.url:' + context.navigation.url);
  return url?.endsWith('/templates');
}

export function isAuTemplateType(context: RuleContext): boolean {
  const node = context.navigation.currentFolder;
  // eslint-disable-next-line no-console
  // console.log('isAuTemplate context.navigation.url:' + context.navigation.url);
  if (node) {
    return node.nodeType === 'cm:folder' ? true : false;
  } else {
    return true;
  }
}

export function isAuPageSelected(auContext: AuRuleContext): boolean {
  // eslint-disable-next-line no-console
  // console.log(`auSelection ${auContext?.auSelection?.page?.id}`);

  /* if (auContext.auItemSelection && (auContext.auItemSelection.nodeType === 'au:page' || auContext.auItemSelection.nodeType === 'au:firstPage')) {
    return true;
  } else {
    return false;
  } */

  if (auContext.auSelection?.page) {
    return true;
  } else {
    return false;
  }
}

export function isFirstAuPageSelected(auContext: AuRuleContext): boolean {
  // eslint-disable-next-line no-console
  // console.log('isAuSectionSelected:' + auContext.auItemSelection.id);
  return auContext.auSelection.isFirstPage ? true : false;
}

export function canDeleteAuPage(auContext: AuRuleContext): boolean {
  // eslint-disable-next-line no-console
  // console.log('isAuSectionSelected:' + auContext.auItemSelection.id);
  if (auContext.auSelection?.isFirstPage === false && !!auContext.auSelection.page === true) {
    return true;
  }
  return false;
}

export function isAuSectionSelected(auContext: AuRuleContext): boolean {
  // eslint-disable-next-line no-console
  // console.log('isAuSectionSelected:' + auContext.auItemSelection.id);
  return auContext.auSelection?.section ? true : false;
}

export function isAuItemSelected(auContext: AuRuleContext): boolean {
  // eslint-disable-next-line no-console
  // console.log('isAuItemSelected:' + auContext.auItemSelection.id);
  if (!!auContext.auSelection?.item === true && !!auContext.auSelection.page === false && !!auContext.auSelection.section === false) {
    return true;
  }
  return false;
}

export function canCreateAuItem(auContext: AuRuleContext): boolean {
  return auContext.auSelection?.item ? true : false;
}
