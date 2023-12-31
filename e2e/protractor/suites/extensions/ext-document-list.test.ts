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

import { AdminActions, BrowsingPage, LoginPage, RepoClient, EXTENSIBILITY_CONFIGS, Utils } from '@alfresco/aca-testing-shared';

describe('Extensions - DocumentList presets', () => {
  const username = `user-${Utils.random()}`;
  const file = `file-${Utils.random()}.txt`;
  let fileId: string;

  const testData = [
    {
      id: 'app.files.name',
      label: 'Name'
    },
    {
      id: 'app.files.size',
      label: 'Size',
      disabled: true
    },
    {
      id: 'app.files.modifiedBy',
      label: 'Test header'
    },
    {
      id: 'some.id.createdBy',
      label: 'New column'
    }
  ];

  const apis = {
    user: new RepoClient(username, username)
  };

  const loginPage = new LoginPage();
  const page = new BrowsingPage();
  const { dataTable } = page;
  const adminApiActions = new AdminActions();

  beforeAll(async () => {
    await adminApiActions.createUser({ username });
    fileId = (await apis.user.nodes.createFile(file)).entry.id;

    await loginPage.load();
    await Utils.setSessionStorageFromConfig(EXTENSIBILITY_CONFIGS.DOCUMENT_LIST_PRESETS);
    await loginPage.loginWith(username);
  });

  beforeEach(async () => {
    await page.clickPersonalFilesAndWait();
  });

  afterAll(async () => {
    await apis.user.nodes.deleteNodeById(fileId);
  });

  it('[C286700] Sets the columns to display', async () => {
    const expectedColumns = testData.filter((item) => !item.disabled).map((data) => data.label);
    const actualColumns = await dataTable.getColumnHeadersText();

    await expect(actualColumns).toEqual(expectedColumns);
  });

  it('[C286699] Disabled items are not shown', async () => {
    const noColumnLabel = testData.find((item) => item.disabled).label;
    const element = dataTable.getColumnHeaderByLabel(noColumnLabel);

    expect(await element.isPresent()).toBe(false, `"${noColumnLabel}" is displayed`);
  });
});
