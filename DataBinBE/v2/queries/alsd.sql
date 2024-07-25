-- group by day
select date(str_to_date(order_date,'%d-%b-%y %h.%i.%s.%f %p')) as day, sum(original_order_total_amount) , sum(status_quantity) as status_quantity from active_line_status group by day order by day;

-- group by hour 
select DATE_FORMAT(str_to_date(order_date,'%d-%b-%y %h.%i.%s.%f %p'),'%Y-%m-%d %H:00:00') as hour, sum(original_order_total_amount) 
, sum(status_quantity) as status_quantity from active_line_status group by hour order by hour;

-- group by 15 minutes
SELECT sec_to_time(time_to_sec(str_to_date(order_date,'%d-%b-%y %h.%i.%s.%f %p'))- time_to_sec(str_to_date(order_date,'%d-%b-%y %h.%i.%s.%f %p'))%(15*60)) 
as intervals, sum(original_order_total_amount)  , sum(status_quantity) as status_quantity from active_line_status where order_date LIKE '01-jan-23%'
group by intervals ;

-- group by 30 minutes
SELECT sec_to_time(time_to_sec(str_to_date(order_date,'%d-%b-%y %h.%i.%s.%f %p'))- time_to_sec(str_to_date(order_date,'%d-%b-%y %h.%i.%s.%f %p'))%(30*60)) 
as intervals, sum(original_order_total_amount)  , sum(status_quantity) as status_quantity from active_line_status where order_date LIKE '01-jan-23%'
group by intervals ;

--  group by 1 hour
SELECT sec_to_time(time_to_sec(order_date_parsed)- time_to_sec(order_date_parsed)%(60*60)) as datetime, sum(original_order_total_amount) as original_order_total_amount,
sum(status_quantity) as status_quantity  from active_line_status where order_date_parsed like '2023-01-01 %' group by datetime ;

-- group by day of a month 
 SELECT DATE(order_date_parsed) AS order_day, SUM(original_order_total_amount) AS total_amount, SUM(status_quantity) AS total_quantity FROM active_line_status where DATE_FORMAT(order_date_parsed, '%m - %y') ='01 - 23'GROUP BY order_day order by order_day;


-- group by LINE_FULFILLMENT_TYPE
select LINE_FULFILLMENT_TYPE, sum(original_order_total_amount) as original_order_total_amount ,sum(status_quantity) as status_quantity from active_line_status group by LINE_FULFILLMENT_TYPE;

-- group by ORDER_CAPTURE_CHANNEL
select ORDER_CAPTURE_CHANNEL, sum(original_order_total_amount) as original_order_total_amount ,sum(status_quantity) as status_quantity from active_line_status group by ORDER_CAPTURE_CHANNEL;


  SELECT enterprise_key,sec_to_time(time_to_sec(order_date_parsed) - time_to_sec(order_date_parsed)%(15 * 60 OR 60 * 60)) as datetime, sum(original_order_total_amount) as original_order_total_amount, 
 sum(line_ordered_qty) as line_ordered_qty from order_book_line  
 

  select ENTERPRISE_KEY,ORDER_CAPTURE_CHANNEL,LINE_FULFILLMENT_TYPE, sum(original_order_total_amount) as original_order_total_amount ,
 sum(line_ordered_qty) as line_ordered_qty from order_book_line 
  group by ENTERPRISE_KEY,ORDER_CAPTURE_CHANNEL,LINE_FULFILLMENT_TYPE;  

   (select enterprise_key,item_id,sum(line_ordered_qty) as line_ordered_qty,sum(original_order_total_amount) as original_order_total_amount
 from order_book_line where enterprise_key ='GC' group by item_id  order by line_ordered_qty desc limit 4) UNION ALL
 select enterprise_key,item_id,sum(line_ordered_qty) as line_ordered_qty,sum(original_order_total_amount) as original_order_total_amount
 from order_book_line where enterprise_key ='MF' group by item_id  order by line_ordered_qty desc limit 8;