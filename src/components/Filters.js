import {
    SfAccordionItem,
    SfButton,
    SfCounter,
    SfChip,
    SfIconClose,
    SfIconChevronLeft,
    SfIconArrowBack,
    SfIconCheck,
    SfListItem,
    SfThumbnail,
    SfRadio,
    SfRating,
    SfSelect,
    SfCheckbox
  } from "@storefront-ui/react"
  import { Fragment, useState } from "react"
  import classNames from "classnames"
  
  const sortOptions = [
    { id: "sort1", label: "None", value: "None" },
    { id: "sort1", label: "Ranking", value: "Ranking" },
    { id: "sort2", label: "World Rank", value: "WorldRank" },
   
  ]
  
  const filtersData = [
    {
      id: "acc4",
      summary: "Sector",
      type: "Sector",
      details: [
        { id: "b1", label: "Public", value: "bg-red-500", counter: 10 },
        { id: "b2", label: "Private", value: "bg-gray-500", counter: 100 },
        { id: "b3", label: "Semi", value: "bg-indigo-500", counter: 0 },
        
      ]
    },
    // {
    //   id: "acc1",
    //   summary: "Size",
    //   type: "size",
    //   details: [
    //     { id: "s1", label: "6", value: "6", counter: 10 },
    //     { id: "s2", label: "6.5", value: "6.5", counter: 10 },
    //     { id: "s3", label: "7", value: "7.5", counter: 30 },
    //     { id: "s4", label: "8", value: "8", counter: 0 },
    //     { id: "s5", label: "8.5", value: "8.5", counter: 3 },
    //     { id: "s6", label: "9", value: "9", counter: 7 },
    //     { id: "s7", label: "9.5", value: "9.5", counter: 9 },
    //     { id: "s8", label: "10", value: "10", counter: 11 },
    //     { id: "s9", label: "10.5", value: "10.5", counter: 12 },
    //     { id: "s10", label: "11", value: "11", counter: 0 },
    //     { id: "s11", label: "11.5", value: "11.5", counter: 4 },
    //     { id: "s12", label: "12", value: "12", counter: 1 }
    //   ]
    // },
    // {
    //   id: "acc2",
    //   summary: "Category",
    //   type: "category",
    //   details: [
    //     {
    //       id: "CLOTHING",
    //       label: "Clothing",
    //       value: "clothing",
    //       counter: 30,
    //       link: "#"
    //     },
    //     {
    //       id: "SHOES",
    //       label: "Shoes",
    //       value: "shoes",
    //       counter: 28,
    //       link: "#"
    //     },
    //     {
    //       id: "ACCESSORIES",
    //       label: "Accessories",
    //       value: "accessories",
    //       counter: 56,
    //       link: "#"
    //     },
    //     {
    //       id: "WEARABLES",
    //       label: "Wearables",
    //       value: "wearables",
    //       counter: 12,
    //       link: "#"
    //     },
    //     {
    //       id: "FOOD_DRINKS",
    //       label: "Food & Drinks",
    //       value: "food and drinks",
    //       counter: 52,
    //       link: "#"
    //     }
    //   ]
    // },
    {
      id: "acc3",
      summary: "Program",
      type: "Program",
      details: [
        {
          id: "p1",
          label: "Art & Design",
          value: "bg-gray-500",
          counter: 10
        },
        {
          id: "p2",
          label: "Medical & Health",
          value: "bg-[linear-gradient(-45deg,#000_50%,#d1d5db_50%)]",
          counter: 5
        },
        {
          id: "p3",
          label: "Engineering & Technology",
          value: "bg-violet-500",
          counter: 0
        },
        {
          id: "p4",
          label: "Computer Science & IT",
          value: "bg-red-500",
          counter: 2
        },
        {
          id: "p5",
          label: "Business Administration",
          value: "bg-yellow-500",
          counter: 100
        },
        {
          id: "p6",
          label: "Commerce & Accounting",
          value: "bg-gradient-to-tr from-yellow-300 to-primary-500",
          counter: 14
        }
      ]
    },
    
    
    // {
    //   id: "acc6",
    //   summary: "Rating",
    //   type: "rating",
    //   details: [
    //     { id: "r1", label: "5", value: "5", counter: 10 },
    //     { id: "r2", label: "4 & up", value: "4", counter: 123 },
    //     { id: "r3", label: "3 & up", value: "3", counter: 12 },
    //     { id: "r4", label: "2 & up", value: "2", counter: 3 },
    //     { id: "r5", label: "1 & up", value: "1", counter: 13 }
    //   ]
    // }
  ]
  
  export default function FiltersSidepanel() {
    const [selectedFilters, setSelectedFilters] = useState([])
    const [price, setPrice] = useState(null)
    const [rating, setRating] = useState(null)
    const [opened, setOpened] = useState(filtersData.map(item => item.id))
  
    const isAccordionItemOpen = id => opened.includes(id)
    const isFilterSelected = selectedValue =>
      selectedFilters.includes(selectedValue)
  
    const handleFilterSelection = selectedValue => {
      if (selectedFilters.indexOf(selectedValue) > -1) {
        setSelectedFilters([
          ...selectedFilters.filter(value => value !== selectedValue)
        ])
      } else {
        setSelectedFilters([...selectedFilters, selectedValue])
      }
    }
  
    const handleToggle = id => open => {
      if (open) {
        setOpened(current => [...current, id])
      } else {
        setOpened(current => current.filter(item => item !== id))
      }
    }
  
    const handleClearFilters = () => {
      setSelectedFilters([])
      setPrice(null)
      setRating(null)
    }
  
    return (
      <aside className="w-full md:max-w-[376px]">
        <div className="flex items-center justify-between mb-4">
          <h4 className="px-2 font-bold typography-headline-4">CAREGORIES</h4>
          <button
            type="button"
            className="sm:hidden text-neutral-500"
            aria-label="Close filters panel"
          >
            <SfIconClose />
          </button>
        </div>
        <h5 className="my-0 p-2 bg-neutral-100 typography-headline-6 font-bold text-neutral-900   md:rounded-none">
          Sort by
        </h5>
        <div className="px-2 mb-6 ">
          <SfSelect
            label="Sort by"
            classList="mb-4"
            v-model="selectedSortOption"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.value}>{option.label}</option>
            ))}
          </SfSelect>
        </div>
        
        
        
        {filtersData.map(section => (
          <Fragment key={section.id}>
            <SfAccordionItem
              onToggle={handleToggle(section.id)}
              open={isAccordionItemOpen(section.id)}
              summary={
                <div className="flex justify-between p-2 mb-2">
                  <p className="mb-2 font-medium typography-headline-5">
                    {section.summary}
                  </p>
                  <SfIconChevronLeft
                    className={classNames(
                      "text-neutral-500",
                      `${
                        isAccordionItemOpen(section.id)
                          ? "rotate-90"
                          : "-rotate-90"
                      }`
                    )}
                  />
                </div>
              }
            >
              
              {/* {section.type === "size" && (
                <ul className="grid grid-cols-5 gap-2">
                  {section.details.map(({ id, label, value, counter }) => (
                    <li key={id}>
                      <SfChip
                        size="sm"
                        className="w-full"
                        inputProps={{
                          value,
                          disabled: !counter,
                          checked: isFilterSelected(value),
                          onChange: event =>
                            handleFilterSelection(event.target.value)
                        }}
                      >
                        {label}
                      </SfChip>
                    </li>
                  ))}
                </ul>
              )} */}
              {/* {section.type === "category" && (
                <ul className="mt-2 mb-6">
                  <li>
                    <SfListItem size="sm" as="button" type="button">
                      <span className="flex items-center">
                        <SfIconArrowBack
                          size="sm"
                          className="text-neutral-500 mr-3"
                        />
                        Back to {section.details[0].label}
                      </span>
                    </SfListItem>
                  </li>
                  {section.details.map(
                    ({ id, link, label, counter }, categoryIndex) => (
                      <li key={id}>
                        <SfListItem
                          size="sm"
                          as="a"
                          href={link}
                          className={classNames(
                            "first-of-type:mt-2 rounded-md active:bg-primary-100",
                            {
                              "bg-primary-100 hover:bg-primary-100 font-medium":
                                categoryIndex === 0
                            }
                          )}
                          slotSuffix={
                            categoryIndex === 0 && (
                              <SfIconCheck
                                size="sm"
                                className="text-primary-700"
                              />
                            )
                          }
                        >
                          <span className="flex items-center">
                            {label}
                            <SfCounter className="ml-2 typography-text-sm font-normal">
                              {counter}
                            </SfCounter>
                          </span>
                        </SfListItem>
                      </li>
                    )
                  )}
                </ul>
              )} */}
              {section.type === "Program" &&
                section.details.map(({ id, label, value, counter }) => (
                  <SfListItem
                    key={id}
                    as="label"
                    size="sm"
                    className={classNames(
                      "px-1.5 bg-transparent hover:bg-transparent",
                      {
                        "font-medium": isFilterSelected(value)
                      }
                    )}
                    selected={isFilterSelected(value)}
                    slotPrefix={
                      <>
                        <input
                          value={value}
                          checked={isFilterSelected(value)}
                          className="appearance-none peer"
                          type="checkbox"
                          onChange={event => {
                            handleFilterSelection(event.target.value)
                          }}
                        />
                        <span className="inline-flex items-center justify-center p-1 transition duration-300 rounded-full cursor-pointer ring-1 ring-neutral-200 ring-inset outline-offset-2 outline-secondary-600 peer-checked:ring-2 peer-checked:ring-primary-700 peer-hover:bg-primary-100 peer-[&:not(:checked):hover]:ring-primary-200 peer-active:bg-primary-200 peer-active:ring-primary-300 peer-disabled:cursor-not-allowed peer-disabled:bg-disabled-100 peer-disabled:opacity-50 peer-disabled:ring-1 peer-disabled:ring-disabled-200 peer-disabled:hover:ring-disabled-200 peer-checked:hover:ring-primary-700 peer-checked:active:ring-primary-700 peer-focus-visible:outline">
                          <SfThumbnail size="sm" className={value} />
                        </span>
                      </>
                    }
                  >
                    <p>
                      <span className="mr-2 text-sm">{label}</span>
                      <SfCounter size="sm">{counter}</SfCounter>
                    </p>
                  </SfListItem>
                ))}
              {section.type === "Sector" &&
                section.details.map(({ label, value, counter }) => (
                  <SfListItem
                    key={value}
                    as="label"
                    size="sm"
                    disabled={counter === 0}
                    className={classNames(
                      "px-1.5 bg-transparent hover:bg-transparent",
                      {
                        "font-medium": isFilterSelected(value)
                      }
                    )}
                    selected={isFilterSelected(value)}
                    slotPrefix={
                      <>
                        <input
                          value={value}
                          checked={isFilterSelected(value)}
                          className="appearance-none peer"
                          type="checkbox"
                          onChange={event => {
                            handleFilterSelection(event.target.value)
                          }}
                        />
                        <span className="inline-flex items-center justify-center p-1 transition duration-300 rounded-full cursor-pointer ring-1 ring-neutral-200 ring-inset outline-offset-2 outline-secondary-600 peer-checked:ring-2 peer-checked:ring-primary-700 peer-hover:bg-primary-100 peer-[&:not(:checked):hover]:ring-primary-200 peer-active:bg-primary-200 peer-active:ring-primary-300 peer-disabled:cursor-not-allowed peer-disabled:bg-disabled-100 peer-disabled:opacity-50 peer-disabled:ring-1 peer-disabled:ring-disabled-200 peer-disabled:hover:ring-disabled-200 peer-checked:hover:ring-primary-700 peer-checked:active:ring-primary-700 peer-focus-visible:outline">
                          <SfThumbnail size="sm" className={value} />
                        </span>
                      </>
                    }
                  >
                    <p>
                      <span className="mr-2 text-sm">{label}</span>
                      <SfCounter size="sm">{counter}</SfCounter>
                    </p>
                  </SfListItem>
                ))}
              {section.type === "radio" && (
                <fieldset name="radio-price">
                  {section.details.map(({ label, value, counter }) => (
                    <SfListItem
                      key={value}
                      as="label"
                      size="sm"
                      disabled={counter === 0}
                      className={classNames(
                        "px-1.5 bg-transparent hover:bg-transparent",
                        {
                          "font-medium": value === price
                        }
                      )}
                      slotPrefix={
                        <SfRadio
                          className="flex items-center"
                          disabled={counter === 0}
                          value={value}
                          checked={price === value}
                          name="radio-price"
                          onChange={() =>
                            setPrice(price === value ? null : value)
                          }
                        />
                      }
                    >
                      <p>
                        <span className="mr-2 text-sm">{label}</span>
                        <SfCounter size="sm">{counter}</SfCounter>
                      </p>
                    </SfListItem>
                  ))}
                </fieldset>
              )}
              {section.type === "rating" && (
                <fieldset id="radio-rating">
                  {section.details.map(({ id, label, value, counter }) => (
                    <SfListItem
                      key={id}
                      as="label"
                      size="sm"
                      className={classNames(
                        "!items-center py-4 md:py-1 bg-transparent hover:bg-transparent",
                        {
                          "font-medium": value === rating
                        }
                      )}
                      slotPrefix={
                        <SfRadio
                          className="flex items-center"
                          value={value}
                          checked={rating === value}
                          name="radio-rating"
                          onChange={() =>
                            setRating(rating === value ? null : value)
                          }
                        />
                      }
                    >
                      {/* TODO: Adjust the styling and remove block elements when/if span wrapper removed from ListItem */}
                      <div className="flex flex-wrap items-center">
                        <SfRating
                          className="-mt-px"
                          value={Number(value)}
                          max={5}
                          size="sm"
                        />
                        <span className="mx-2 text-base md:text-sm">{label}</span>
                        <SfCounter size="sm">{counter}</SfCounter>
                      </div>
                    </SfListItem>
                  ))}
                </fieldset>
              )}
            </SfAccordionItem>
            <hr className="my-4" />
          </Fragment>
        ))}
        <div className="flex justify-between">
          <SfButton
            variant="secondary"
            className="w-full mr-3"
            onClick={handleClearFilters}
          >
            Clear all filters
          </SfButton>
          <SfButton className="w-full">Show products</SfButton>
        </div>
      </aside>
    )
  }
  