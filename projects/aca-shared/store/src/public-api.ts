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

export * from './actions/app-action-types';
export * from './actions/context-menu-action-types';
export * from './actions/router-action-types';
export * from './actions/template-action-types';
export * from './actions/app.actions';
export * from './actions/library.actions';
export * from './actions/node.actions';
export * from './actions/router.actions';
export * from './actions/search.actions';
export * from './actions/snackbar.actions';
export * from './actions/upload.actions';
export * from './actions/viewer.actions';
export * from './actions/metadata-aspect.actions';
export * from './actions/template.actions';
export * from './actions/contextmenu.actions';

export * from './effects/dialog.effects';
export * from './effects/router.effects';
export * from './effects/snackbar.effects';

export * from './models/delete-status.model';
export * from './models/deleted-node-info.model';
export * from './models/node-info.model';
export * from './models/search-option.model';

export * from './selectors/app.selectors';

export * from './states/app.state';

export * from './store.module';

// !!gyl add
// export * from './actions/au-template.actions';
export * from './actions/au-templates-actions';
// export * from './actions/au-item.actions';
// export * from './actions/au-category.actions';
// export * from './actions/au-response-set.actions';
// export * from './actions/au-global-response-set.actions';
export * from './actions/au-templ.actions';

export * as fromPages from './reducers/au-pages.reducer';
// export * as fromItem from './reducers/au-item.reducer';
// export * as fromCategory from './reducers/au-category.reducer';
// export * as fromResponseSet from './reducers/au-response-set.reducer';
// export * as fromGlobalResponseSet from './reducers/au-global-response-set.reducer';
// export * as fromTempl from './reducers/au-templ.reducer';
// export * from './models/au-templates.model';
// export * from './models/au-item.model';
// export * from './models/au-category.model';
// export * from './models/au-response-set.model';
// export * from './models/au-global-response-set.model';
export * from './effects/au-templates.effects';
export * from './selectors/au-templates.selectors';
// export * from './selectors/au-category.selectors';
// export * from './selectors/au-item.selectors';
// export * from './selectors/au-template.selectors';
// export * from './reducers/au-templates.reducer';
// export * from './states/au-templates.state'

export * from './reducers/au-templ.reducer';
export * from './selectors/au-templ.selectors';
export * from './models/au-templ.model';
export * from './services/au-templates.service';
