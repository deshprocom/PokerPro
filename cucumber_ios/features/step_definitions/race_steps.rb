Then(/^可看到更多的未来赛事$/) do
  wait do
    btn = id('btn_races_100')
    puts "DEBUG: got btn: #{btn}"
  end
end

Then(/^可看到更多的历史赛事$/) do
  wait do
    btn = id('btn_races_2')
    puts "DEBUG: got btn: #{btn}"
  end
end

Then(/^可看到更多的票务/) do
  wait do
    btn = id('btn_races_100')
    puts "DEBUG: got btn: #{btn}"
  end
end