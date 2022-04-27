import React from 'react';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentMapper, FormTemplate } from '../index';

describe('DualListSelect', () => {
  let onSubmit;
  let initialProps;
  let schema;

  beforeEach(() => {
    onSubmit = jest.fn();

    schema = {
      fields: [
        {
          component: componentTypes.DUAL_LIST_SELECT,
          name: 'dual-list',
          options: [
            {
              value: 'cats',
              label: 'cats',
            },
            {
              value: 'cats_1',
              label: 'cats_1',
            },
            {
              value: 'cats_2',
              label: 'cats_2',
            },
            {
              value: 'zebras',
              label: 'zebras',
            },
            {
              value: 'pigeons',
              label: 'pigeons',
            },
          ],
        },
      ],
    };

    initialProps = {
      onSubmit: (values) => onSubmit(values),
      componentMapper,
      FormTemplate,
      schema,
    };
  });

  it('renders correctly', () => {
    render(<FormRenderer {...initialProps} />);

    expect(screen.getByText('cats')).toBeInTheDocument();
    expect(screen.getByText('cats_1')).toBeInTheDocument();
    expect(screen.getByText('cats_2')).toBeInTheDocument();
    expect(screen.getByText('zebras')).toBeInTheDocument();
    expect(screen.getByText('pigeons')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filter options')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filter selected value')).toBeInTheDocument();
    expect(screen.getByText('No selected')).toBeInTheDocument();
  });

  it('switch left option', async () => {
    render(<FormRenderer {...initialProps} />);

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({});

    await userEvent.click(screen.getByText('cats'));
    await userEvent.click(screen.getByTitle('Move selected to right'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenLastCalledWith({ 'dual-list': ['cats'] });
  });

  it('switch left option with holding ctrl', async () => {
    render(<FormRenderer {...initialProps} />);

    await userEvent.click(screen.getByText('cats'));

    const user = userEvent.setup();

    await user.keyboard('{Control>}');
    await user.click(screen.getByText('zebras'));
    await user.keyboard('{/Control}');

    await userEvent.click(screen.getByTitle('Move selected to right'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenLastCalledWith({ 'dual-list': ['cats', 'zebras'] });
  });

  it('switch left option with holding shift', async () => {
    render(<FormRenderer {...initialProps} />);

    await userEvent.click(screen.getByText('cats'));
    const user = userEvent.setup();

    await user.keyboard('{Shift>}');
    await user.click(screen.getByText('zebras'));
    await user.keyboard('{/Shift}');

    await userEvent.click(screen.getByTitle('Move selected to right'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenLastCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch left option with holding and removing by ctrl', async () => {
    render(<FormRenderer {...initialProps} />);

    await userEvent.click(screen.getByText('cats'));

    const user = userEvent.setup();

    await user.keyboard('{Shift>}');
    await user.click(screen.getByText('zebras'));
    await user.keyboard('{/Shift}');

    await user.keyboard('{Control>}');
    await user.click(screen.getByText('cats'));
    await user.keyboard('{/Control}');

    await userEvent.click(screen.getByTitle('Move selected to right'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenLastCalledWith({ 'dual-list': ['cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch right option', async () => {
    render(<FormRenderer {...initialProps} initialValues={{ 'dual-list': ['cats'] }} />);

    await userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenLastCalledWith({ 'dual-list': ['cats'] });

    await userEvent.click(screen.getByText('cats'));
    await userEvent.click(screen.getByTitle('Move selected to left'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenLastCalledWith({ 'dual-list': [] });
  });

  it('switch all to right', async () => {
    render(<FormRenderer {...initialProps} />);

    await userEvent.click(screen.getByTitle('Move all to right'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch all to left', async () => {
    render(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    await userEvent.click(screen.getByTitle('Move all to left'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      'dual-list': [],
    });
  });

  it('filters options', async () => {
    render(<FormRenderer {...initialProps} />);

    await userEvent.type(screen.getByPlaceholderText('Filter options'), 'cats');

    expect(screen.getByText('cats')).toBeInTheDocument();
    expect(screen.getByText('cats_1')).toBeInTheDocument();
    expect(screen.getByText('cats_2')).toBeInTheDocument();
    expect(() => screen.getByText('zebras')).toThrow();
    expect(() => screen.getByText('pigeons')).toThrow();
  });

  it('filters value', async () => {
    render(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    await userEvent.type(screen.getByPlaceholderText('Filter selected value'), 'cats');

    expect(screen.getByText('cats')).toBeInTheDocument();
    expect(screen.getByText('cats_1')).toBeInTheDocument();
    expect(screen.getByText('cats_2')).toBeInTheDocument();
    expect(() => screen.getByText('zebras')).toThrow();
    expect(() => screen.getByText('pigeons')).toThrow();
  });

  it('sort options', async () => {
    const { container } = render(<FormRenderer {...initialProps} />);

    expect([...container.getElementsByClassName('ui segment')].map((el) => [...el.children].map((e) => e.textContent)).flatMap((x) => x)).toEqual([
      'cats',
      'cats_1',
      'cats_2',
      'pigeons',
      'zebras',
      'No selected',
    ]);

    await userEvent.click(screen.getByTitle('Sort options'));

    expect([...container.getElementsByClassName('ui segment')].map((el) => [...el.children].map((e) => e.textContent)).flatMap((x) => x)).toEqual([
      'zebras',
      'pigeons',
      'cats_2',
      'cats_1',
      'cats',
      'No selected',
    ]);

    await userEvent.click(screen.getByTitle('Sort options'));

    expect([...container.getElementsByClassName('ui segment')].map((el) => [...el.children].map((e) => e.textContent)).flatMap((x) => x)).toEqual([
      'cats',
      'cats_1',
      'cats_2',
      'pigeons',
      'zebras',
      'No selected',
    ]);
  });

  it('sort value', async () => {
    const { container } = render(
      <FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />
    );

    expect([...container.getElementsByClassName('ui segment')].map((el) => [...el.children].map((e) => e.textContent)).flatMap((x) => x)).toEqual([
      'No available options',
      'cats',
      'cats_1',
      'cats_2',
      'pigeons',
      'zebras',
    ]);

    await userEvent.click(screen.getByTitle('Sort value'));

    expect([...container.getElementsByClassName('ui segment')].map((el) => [...el.children].map((e) => e.textContent)).flatMap((x) => x)).toEqual([
      'No available options',
      'zebras',
      'pigeons',
      'cats_2',
      'cats_1',
      'cats',
    ]);

    await userEvent.click(screen.getByTitle('Sort value'));

    expect([...container.getElementsByClassName('ui segment')].map((el) => [...el.children].map((e) => e.textContent)).flatMap((x) => x)).toEqual([
      'No available options',
      'cats',
      'cats_1',
      'cats_2',
      'pigeons',
      'zebras',
    ]);
  });

  describe('filtered options', () => {
    it('switch all visible to right', async () => {
      render(<FormRenderer {...initialProps} />);

      await userEvent.type(screen.getByPlaceholderText('Filter options'), 'cats');
      await userEvent.click(screen.getByTitle('Move all to right'));
      await userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2'] });
    });
  });

  describe('filtered value', () => {
    it('switch all visible to left', async () => {
      render(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

      await userEvent.type(screen.getByPlaceholderText('Filter selected value'), 'cats');
      await userEvent.click(screen.getByTitle('Move all to left'));
      await userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['zebras', 'pigeons'] });
    });
  });
});
